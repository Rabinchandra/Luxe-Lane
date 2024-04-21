import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./config";
import { Product } from "../interface/Product";
import { products } from "./data";

export function addAllProducts() {
  products.forEach(async (data) => {
    const productCollection = collection(db, "products");
    const newDocRef = doc(productCollection, data.id);

    const res = await setDoc(newDocRef, data);
    console.log(res);
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  // Check if ID is provided
  if (!id) {
    throw new Error("Please provide a document ID to fetch data.");
  }

  // Create a document reference with the provided ID
  const moneyDocRef = doc(db, "products", id);

  // Get the document data
  const docSnapshot = await getDoc(moneyDocRef);

  // Check if document exists
  if (docSnapshot.exists()) {
    return <Product>docSnapshot.data();
  } else {
    // Handle document not found scenario (optional)
    console.warn(
      "Document with ID",
      id,
      "not found in the 'money' collection."
    );
    return null; // Or return an empty object/placeholder
  }
}
