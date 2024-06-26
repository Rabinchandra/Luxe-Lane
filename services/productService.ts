import { doc, getDoc } from "firebase/firestore";
import { IProduct } from "@/interface/IProduct";
import { db } from "@/firebase/config";

// Get a specific product
export async function getProductById(id: string): Promise<IProduct | null> {
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
    return <IProduct>docSnapshot.data();
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
