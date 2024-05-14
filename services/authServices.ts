import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { IProduct } from "@/interface/IProduct";
// import { products } from "@/firebase/data";
import { auth } from "@/firebase/config";
import { User, updateProfile } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

/* export function addAllProducts() {
  products.forEach(async (data) => {
    const productCollection = collection(db, "products");
    const newDocRef = doc(productCollection, data.id);

    const res = await setDoc(newDocRef, data);
    console.log(res);
  });
} */

// save new user to doc - firestore
export async function saveUserToDoc(user: User) {
  // Store additional user information in Firestore
  const userId = user.uid; // Get the Firebase Auth ID
  const userRef = collection(db, "users"); // Reference to the users collection, db is the reference to the firestore
  const newDocRef = doc(userRef, userId); // when creating new doc, userID make sure the new doc id is same as userID

  const res = await setDoc(newDocRef, {
    email: user.email,
    displayName: user.displayName,
  });

  return res;
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
      }).then(async () => {
        // Store additional user information in Firestore
        await saveUserToDoc(user);
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
