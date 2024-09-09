// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "side-ride.firebaseapp.com",
  projectId: "side-ride",
  storageBucket: "side-ride.appspot.com",
  messagingSenderId: "709003963673",
  appId: "1:709003963673:web:ca65cd90fc7be04ee2a988"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);