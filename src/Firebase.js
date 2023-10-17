import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD-A6kx_OTNcQ-b_yDooz8kLibi7FFrSAY",
  authDomain: "reel-chat-1361a.firebaseapp.com",
  projectId: "reel-chat-1361a",
  storageBucket: "reel-chat-1361a.appspot.com",
  messagingSenderId: "419187678143",
  appId: "1:419187678143:web:6696787bd331c26d029f0a"
};
const app = initializeApp(firebaseConfig);



export const Auth = getAuth();
export const Storage = getStorage();
export const db = getFirestore();