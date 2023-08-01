import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../config/server-config";
import { getFirestore } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { getFirebaseAdminApp } from "../../firebase";
import { faker } from '@faker-js/faker';

const fakeProduct = {
  title: faker.commerce.productName(),
  price: faker.commerce.price(),
  imageUrl: faker.image.urlPicsumPhotos({ width: 640, height: 480}),
  inventory: {
    sku: faker.number.int({min: 1000000, max: 9999999}),
    status: 'enabled', //['disabled', 'enabled', 'in-stock', 'out-of-stock', 'backordered']
    quantity: faker.number.int({min: 0, max: 500}),
    lowQuantityWarning: faker.number.int({min: 0, max: 5}),
  }
}

export async function POST(request: NextRequest) {
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    throw new Error("There was an error getting tokens");
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
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  // it's unclear to my why the request obj is a promise, but this is a work around
  // https://github.com/vercel/next.js/issues/50846
  const body = await request.json();
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    throw new Error("There was an error getting tokens");
  }

  const db = getFirestore(getFirebaseAdminApp());
  const productRef = db.collection('products').doc(body.id);

  await productRef.update(fakeProduct);
  return NextResponse.json({id: body.id, ...fakeProduct});
}

export async function DELETE(request: NextRequest) {
  // it's unclear to my why the request obj is a promise, but this is a work around
  // https://github.com/vercel/next.js/issues/50846
  const body = await request.json();
  const tokens = await getTokens(request.cookies, authConfig);

  if (!tokens) {
    throw new Error("There was an error getting tokens");
  }

  const db = getFirestore(getFirebaseAdminApp());
  const productRef = db.collection('products').doc(body.id);

  await productRef.delete();
  return NextResponse.json(body.id);
}