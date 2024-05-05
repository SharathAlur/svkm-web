import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVIPX4EVja5xHW74cd-E5jI3nvD-8bCtw",
  authDomain: "svkm-alur.firebaseapp.com",
  projectId: "svkm-alur",
  storageBucket: "svkm-alur.appspot.com",
  messagingSenderId: "988487232089",
  appId: "1:988487232089:web:aa79d5d8d1c72108dddf48",
  measurementId: "G-0SLKMXNXQW",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const fireStore = getFirestore(app);

export { fireStore };
