import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./config";
import { Product } from "../interface/Product";
import { products } from "./data";
import { auth } from "./config";
import { updateProfile } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

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
export function createUser(
  email: string,
  password: string,
  name: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile
      updateProfile(user, {
        displayName: name,
        photoURL:
          "https://pics.craiyon.com/2023-07-11/830372684bde440a93c1f113b66d1050.webp",
      });

      console.log("User created successfully:", user.uid);
      // Handle successful user creation (e.g., redirect to a welcome page)

      // Store additional user information in Firestore
      const userId = user.uid; // Get the Firebase Auth ID
      const userRef = collection(db, "users"); // Reference to the users collection, db is the reference to the firestore
      const newDocRef = doc(userRef, userId); // when creating new doc, userID make sure the new doc id is same as userID

      const res = await setDoc(newDocRef, {
        email: user.email,
        displayName: name || "Anonymous",
      });

      resolve("User successfully created!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        let msg = error.code;

        switch (msg) {
          case "auth/invalid-email":
            msg = "Please provide a valid Email";
            break;
          case "auth/weak-password":
            msg = "Password is weak";
            break;
          case "auth/missing-password":
            msg = "Your should fill the password";
            break;
          case "auth/email-already-in-use":
            msg = "Email already in use. Try other email";
            break;
          default:
            msg = msg;
        }

        reject(msg);
      } else {
        reject("Something went wrong!");
      }
    }
  });
}

// Function to sign in with Google
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
