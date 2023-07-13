// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVmGR10r53zIoP4ZNlIwD3QFk7ruXHwPs",
  authDomain: "final-project-632a9.firebaseapp.com",
  projectId: "final-project-632a9",
  storageBucket: "final-project-632a9.appspot.com",
  messagingSenderId: "748855832503",
  appId: "1:748855832503:web:3a5d1c3c890fa9a03fc232",
  measurementId: "G-Y8WHNMPPT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const storage = getStorage(app);