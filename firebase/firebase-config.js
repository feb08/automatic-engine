// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_7OhR4vOWnkP8TPTysyw3gjGmkjHcoUk",
  authDomain: "reactnative-auth-74f60.firebaseapp.com",
  projectId: "reactnative-auth-74f60",
  storageBucket: "reactnative-auth-74f60.appspot.com",
  messagingSenderId: "8907214824",
  appId: "1:8907214824:web:f804fcc4486b4d533f1e5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);