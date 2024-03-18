import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./config";

import { products } from "./data";

export function addAllProducts() {
  products.forEach(async (data) => {
    const productCollection = collection(db, "products");
    const newDocRef = doc(productCollection, data.id);

    const res = await setDoc(newDocRef, data);
    console.log(res);
  });
}
