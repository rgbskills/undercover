import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../config/server-config";
import { getFirestore, Timestamp,  } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { getFirebaseAdminApp } from "../../firebase";

//TODO: Should use Zod for validation
export async function POST(request: NextRequest) {
  const body = await request.json();
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    throw new Error("There was an error getting tokens");
  }

  const order = {
    ...body,
    uid: tokens.decodedToken.uid,
    createdAt: Timestamp.fromDate(new Date()) // Use Timestamp.fromDate() for Firestore timestamp
  };

  const db = getFirestore(getFirebaseAdminApp());
  const orders = db.collection("orders");

  // should use runTransaction() when you need to handle store updates atomically
  try {
    const response = await orders.add(order);
    return new NextResponse(JSON.stringify({ orderId: response.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error adding order to Firestore:", error);
    return new NextResponse(JSON.stringify({ message: "Error adding order" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

//TODO: This should also be enforced in Firestore security rules
export async function GET(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    throw new Error("There was an error getting tokens");
  }

  const db = getFirestore(getFirebaseAdminApp());
  const ordersRef = db.collection("orders");

  // Add a where clause to filter orders by the user's UID
  const userOrdersQuery = ordersRef.where("uid", "==", tokens.decodedToken.uid);
  const snapshot = await userOrdersQuery.get();

  const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  return new NextResponse(JSON.stringify(orders), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}