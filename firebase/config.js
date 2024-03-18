// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMXCyXD7Uq7-jLpQ-k44zrmZ0e6AczyZE",
  authDomain: "luxe-lane.firebaseapp.com",
  projectId: "luxe-lane",
  storageBucket: "luxe-lane.appspot.com",
  messagingSenderId: "354350598574",
  appId: "1:354350598574:web:b150786d3ade8a4467e03f",
  measurementId: "G-QRX8JP2HVJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Db
export const db = getFirestore(app);
