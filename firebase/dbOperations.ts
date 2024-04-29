import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./config";
import { Product } from "../interface/Product";
import { products } from "./data";
import { auth } from "./config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function addAllProducts() {
  products.forEach(async (data) => {
    const productCollection = collection(db, "products");
    const newDocRef = doc(productCollection, data.id);

    const res = await setDoc(newDocRef, data);
    console.log(res);
  });
}

// Get a specific product
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

// Add a new user
// Function to create a new user with email and password
export async function createUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created successfully:", user.uid);
    // Handle successful user creation (e.g., redirect to a welcome page)

    // (Optional) Store additional user information in Firestore
    const userId = user.uid; // Get the Firebase Auth ID
    const userRef = collection(db, "users"); // Reference to the users collection, db is the reference to the firestore
    const newDocRef = doc(userRef, userId); // when creating new doc, userID make sure the new doc id is same as userID

    const res = await setDoc(newDocRef, {
      email: user.email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
