// ============================================================
// JHAY ATELIER — Firestore Service Layer
// All real-time reads and writes go through here.
// ============================================================
import {
  db,
  ordersCol,
  bookingsCol,
  productsCol,
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
  writeBatch,
  collection
} from "./firebase";

import { PRODUCTS } from "./data/atelierData";

// ─────────────────────────────────────────────────────────────
// SEED — write default products to Firestore once if empty
// ─────────────────────────────────────────────────────────────
export async function seedProductsIfEmpty() {
  const snap = await getDocs(productsCol);
  if (!snap.empty) return; // already seeded

  const batch = writeBatch(db);
  PRODUCTS.forEach((p) => {
    const ref = doc(productsCol, p.id);
    batch.set(ref, { ...p, createdAt: serverTimestamp() });
  });
  await batch.commit();
  console.log("[JHAY] Firestore seeded with default products.");
}

// ─────────────────────────────────────────────────────────────
// ORDERS  — real-time listener
// ─────────────────────────────────────────────────────────────
export function subscribeOrders(callback) {
  const q = query(ordersCol, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const orders = snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
    callback(orders);
  });
}

export async function addOrder(orderData) {
  return addDoc(ordersCol, {
    ...orderData,
    createdAt: serverTimestamp()
  });
}

export async function updateOrderStatus(docId, newStatus) {
  const ref = doc(ordersCol, docId);
  return updateDoc(ref, { status: newStatus });
}

// ─────────────────────────────────────────────────────────────
// BOOKINGS — real-time listener
// ─────────────────────────────────────────────────────────────
export function subscribeBookings(callback) {
  const q = query(bookingsCol, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const bookings = snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
    callback(bookings);
  });
}

export async function addBooking(bookingData) {
  return addDoc(bookingsCol, {
    ...bookingData,
    createdAt: serverTimestamp()
  });
}

export async function updateBookingStatus(docId, newStatus) {
  const ref = doc(bookingsCol, docId);
  return updateDoc(ref, { status: newStatus });
}

// ─────────────────────────────────────────────────────────────
// PRODUCTS / CATALOG — real-time listener
// ─────────────────────────────────────────────────────────────
export function subscribeProducts(callback) {
  const q = query(productsCol, orderBy("createdAt", "asc"));
  return onSnapshot(q, (snap) => {
    const products = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
    callback(products);
  });
}

export async function addProduct(productData) {
  return setDoc(doc(productsCol, productData.id), {
    ...productData,
    createdAt: serverTimestamp()
  });
}

export async function updateProductPrice(docId, newPrice) {
  const ref = doc(productsCol, docId);
  return updateDoc(ref, { priceUSD: newPrice });
}

export async function updateProduct(docId, fields) {
  const ref = doc(productsCol, docId);
  return updateDoc(ref, fields);
}

export async function deleteProduct(docId) {
  const ref = doc(productsCol, docId);
  return deleteDoc(ref);
}
