import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8IMOrtxDIwdXoOIhzbU9vrM4SM-F3_7o",
  authDomain: "reactauthapp-763ce.firebaseapp.com",
  projectId: "reactauthapp-763ce",
  storageBucket: "reactauthapp-763ce.firebasestorage.app",
  messagingSenderId: "25983710900",
  appId: "1:25983710900:web:055fb6a39ca1591901c9e1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
