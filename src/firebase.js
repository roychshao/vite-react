// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJonnYaRDnO78xu3BPorNfFpKbim4PWwE",
  authDomain: "vite-react-7426b.firebaseapp.com",
  projectId: "vite-react-7426b",
  storageBucket: "vite-react-7426b.appspot.com",
  messagingSenderId: "877292838375",
  appId: "1:877292838375:web:9b4fc3ba3143005c10f142",
  measurementId: "G-BZ8FKDY4RN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
