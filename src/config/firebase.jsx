// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaJ7MEsGcq1yOpZqA6RCv-Xa_0yiIJDWA",
  authDomain: "react-firebase-auth-9d8fb.firebaseapp.com",
  projectId: "react-firebase-auth-9d8fb",
  storageBucket: "react-firebase-auth-9d8fb.appspot.com",
  messagingSenderId: "1088278437628",
  appId: "1:1088278437628:web:1caa524b45c412ea8e0179",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
