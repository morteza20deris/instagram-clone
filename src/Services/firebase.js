// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrmIGBOjnztWQnQiF1TnIm5pdy5h3EJ_A",
  authDomain: "instagram-clone-4fecb.firebaseapp.com",
  projectId: "instagram-clone-4fecb",
  storageBucket: "instagram-clone-4fecb.appspot.com",
  messagingSenderId: "698609173871",
  appId: "1:698609173871:web:897636277a38bf7e91549a",
  measurementId: "G-M926CTPHFX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const authentication = getAuth(app);
export const storage = getStorage(app);
