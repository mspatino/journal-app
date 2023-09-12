// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzn7bJZtSW5gFKgSuSRveb4WKUqdqmNwg",
  authDomain: "react-cursos-50ab5.firebaseapp.com",
  projectId: "react-cursos-50ab5",
  storageBucket: "react-cursos-50ab5.appspot.com",
  messagingSenderId: "729486026762",
  appId: "1:729486026762:web:4a4833437c750f9fffd7f3"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );
