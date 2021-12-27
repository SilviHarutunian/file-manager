import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXbvy2W-AnzQ6_JI7gix7n7xxP1Od9Sf4",
  authDomain: "files-manager-50de1.firebaseapp.com",
  projectId: "files-manager-50de1",
  storageBucket: "files-manager-50de1.appspot.com",
  messagingSenderId: "1061569602390",
  appId: "1:1061569602390:web:797fd1a4ed69e74d07acf7",
  measurementId: "G-XTHLJELMCF",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
