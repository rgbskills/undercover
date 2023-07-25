import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../config/server-config";
import { getFirestore } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { getFirebaseAdminApp } from "../../firebase";
import { faker } from '@faker-js/faker';

export async function POST(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    throw new Error("Cannot update counter of unauthenticated user");
  }

  const fakeProduct = {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    imageUrl: faker.image.urlPicsumPhotos({ width: 640, height: 480}),
  }

  const db = getFirestore(getFirebaseAdminApp());
  const products = db.collection("products")

  const response = await products.add(fakeProduct);
  return NextResponse.json({id: response.id, ...fakeProduct});
}

export async function GET() {
  const db = getFirestore(getFirebaseAdminApp());

  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error("Failed to fetch products");
  }
}
