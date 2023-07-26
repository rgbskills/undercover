// The PUT endpoint returns an erro due to a node 16 bug, I tried node 18, but some dependancies stop working
// because of this we will create this work around until I come up with a fix
// https://github.com/vercel/next.js/discussions/49690
// There is also an issue with the request obj: https://github.com/nodejs/node/issues/46323

// TODO: FIX STEPS:
// UPDATE TO NODE 18
// DELETE .next folder
// DELETE node_modules folder
// run npm install
// run npm run dev

import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../config/server-config";
import { getFirestore } from "firebase-admin/firestore";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import { getFirebaseAdminApp } from "../../firebase";
import { faker } from '@faker-js/faker';

// export async function POST(request: NextRequest) {
//   // console.log("Full Request Object:", JSON.stringify(request, null, 2));
//   // ... rest of your code
//   console.log('@@@2134@@', JSON.stringify(request.body))
// }

export async function POST(request: NextRequest) {
  const body = await request.json();
  // const tokens = await getTokens(request.cookies, authConfig);

  // if (!tokens) {
  //   throw new Error("There was an error getting tokens");
  // }

  // const fakeProduct = {
  //   title: faker.commerce.productName(),
  //   price: faker.commerce.price(),
  //   imageUrl: faker.image.urlPicsumPhotos({ width: 640, height: 480}),
  // }

  // const db = getFirestore(getFirebaseAdminApp());
  console.log('NAgy fas', JSON.stringify(body))
  // const productRef = db.collection('products').doc(JSON.stringify(request.id));
  // const products = db.collection("products")

  // const response = await products.add(fakeProduct);
  return NextResponse.json({id: "fasz"});
}

// export async function POST(request: NextRequest) {
//   console.log('@@@@@', JSON.stringify(request))
//   const requestClean = JSON.parse(request);
//   const tokens = await getTokens(requestClean.cookies, authConfig);

//   if (!tokens) {
//     throw new Error("There was an error getting tokens");
//   }

//   const fakeProduct = {
//     title: faker.commerce.productName(),
//     price: faker.commerce.price(),
//     imageUrl: faker.image.urlPicsumPhotos({ width: 640, height: 480}),
//   }

//   const db = getFirestore(getFirebaseAdminApp());
//   const productRef = db.collection('products').doc(JSON.stringify(requestClean.body.id));

//   const response = await productRef.update(fakeProduct);
//   return NextResponse.json({id: 'response.id'});
// }