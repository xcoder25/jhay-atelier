// ============================================================
// JHAY ATELIER — Firebase Configuration & Firestore Instance
// ============================================================
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
  writeBatch
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGB0cUmu7KwVrdUMv0UrbNcOUK2e6m5d8",
  authDomain: "intellectra-8w7dd.firebaseapp.com",
  projectId: "intellectra-8w7dd",
  storageBucket: "intellectra-8w7dd.firebasestorage.app",
  messagingSenderId: "947820039675",
  appId: "1:947820039675:web:f5d84c7bc6b2d0dad58f5e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ── Collection references ─────────────────────────────────────
export const ordersCol    = collection(db, "orders");
export const bookingsCol  = collection(db, "bookings");
export const productsCol  = collection(db, "products");

// ── Re-export commonly used Firestore helpers ──────────────────
export {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
  writeBatch
};
