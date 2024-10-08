// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMXdBp-VPbBWdfM8917bcrGvoYeXujqGI",
  authDomain: "chat-app-firebase-3127b.firebaseapp.com",
  projectId: "chat-app-firebase-3127b",
  storageBucket: "chat-app-firebase-3127b.appspot.com",
  messagingSenderId: "574214151229",
  appId: "1:574214151229:web:7464124c526ed32d679e54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };