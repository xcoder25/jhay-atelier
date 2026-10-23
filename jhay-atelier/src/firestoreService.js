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
// BOOKINGS — real-time listener with local backup & auto-email
// ─────────────────────────────────────────────────────────────
import { sendBookingToAdmin } from "./emailNotificationService";

const STORAGE_BOOKINGS_KEY = "jhay_atelier_bookings";

function getLocalBookings() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_BOOKINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalBookings(list) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("[JHAY] Failed to save bookings to localStorage", e);
  }
}

export function subscribeBookings(callback) {
  // 1. Immediately emit any locally saved bookings
  const localList = getLocalBookings();
  if (localList.length > 0) {
    callback(localList);
  }

  // 2. Listen to cross-tab custom events
  const handleLocalUpdate = () => {
    callback(getLocalBookings());
  };
  window.addEventListener("jhay_booking_event", handleLocalUpdate);
  window.addEventListener("storage", handleLocalUpdate);

  // 3. Listen to Firestore real-time updates
  let unsub = () => {};
  try {
    const q = query(bookingsCol, orderBy("createdAt", "desc"));
    unsub = onSnapshot(
      q,
      (snap) => {
        const firestoreBookings = snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
        // Merge firestore with local
        const existingLocal = getLocalBookings();
        const mergedMap = new Map();
        
        // Firestore takes precedence for same _id or bookingRef
        firestoreBookings.forEach((b) => {
          mergedMap.set(b._id || b.bookingRef, b);
        });
        existingLocal.forEach((b) => {
          const key = b._id || b.bookingRef;
          if (!mergedMap.has(key)) {
            mergedMap.set(key, b);
          }
        });

        const merged = Array.from(mergedMap.values());
        saveLocalBookings(merged);
        callback(merged);
      },
      (err) => {
        console.warn("[JHAY] Firestore bookings subscription fallback to local storage:", err);
      }
    );
  } catch (err) {
    console.warn("[JHAY] Firestore query failed, maintaining local bookings:", err);
  }

  return () => {
    unsub();
    window.removeEventListener("jhay_booking_event", handleLocalUpdate);
    window.removeEventListener("storage", handleLocalUpdate);
  };
}

export async function addBooking(bookingData) {
  // 1. Persist locally first for immediate reliability
  const current = getLocalBookings();
  const enhancedBooking = {
    ...bookingData,
    _id: bookingData._id || `local-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  const updated = [enhancedBooking, ...current.filter((b) => b.bookingRef !== bookingData.bookingRef)];
  saveLocalBookings(updated);

  // 2. Dispatch cross-component event so admin dashboard wakes up immediately
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("jhay_booking_event", { detail: enhancedBooking }));
  }

  // 3. Auto-send email to admin in background
  sendBookingToAdmin(enhancedBooking).catch((err) => {
    console.warn("[JHAY] Auto email notification attempt finished with warning:", err);
  });

  // 4. Save to Firestore
  try {
    const docRef = await addDoc(bookingsCol, {
      ...bookingData,
      createdAt: serverTimestamp()
    });
    return docRef;
  } catch (err) {
    console.warn("[JHAY] Firestore write skipped/offline, booking preserved locally:", err);
    return { id: enhancedBooking._id };
  }
}

export async function updateBookingStatus(docId, newStatus) {
  // Update local storage
  const list = getLocalBookings().map((b) => {
    if (b._id === docId || b.bookingRef === docId) {
      return { ...b, status: newStatus };
    }
    return b;
  });
  saveLocalBookings(list);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("jhay_booking_event"));
  }

  // Update Firestore if available and valid ID
  if (docId && !docId.startsWith("local-")) {
    try {
      const ref = doc(bookingsCol, docId);
      return await updateDoc(ref, { status: newStatus });
    } catch (err) {
      console.warn("[JHAY] Firestore booking status update failed:", err);
    }
  }
  return true;
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
