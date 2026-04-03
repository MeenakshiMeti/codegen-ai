import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqpSSXoBrxyGT7KQuQpErRcRYQVCDdSlI",
  authDomain: "codegen-ai-c7b27.firebaseapp.com",
  projectId: "codegen-ai-c7b27",
  storageBucket: "codegen-ai-c7b27.firebasestorage.app",
  messagingSenderId: "506511805507",
  appId: "1:506511805507:web:333258a62c1943ad4898f6",
  measurementId: "G-YPTD741Q7W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);