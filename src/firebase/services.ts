import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  limit,
} from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './config';
import { Product, Order, Review, UserProfile } from '../types';

// Collection references
const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';
const REVIEWS_COLLECTION = 'reviews';
const USERS_COLLECTION = 'users';
const SUPPORT_COLLECTION = 'support_threads';

/**
 * Initialize Firebase Authentication
 * Authenticates anonymously if no active session, preserving user identity securely
 */
export const checkFirebaseConnection = async (): Promise<boolean> => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), limit(1));
    await getDocs(q);
    return true;
  } catch (error) {
    console.warn('[Firebase Firestore] Connection status check notice:', error);
    return false;
  }
};

export const initFirebaseAuth = () => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        signInAnonymously(auth).catch((err) => {
          console.warn('[Firebase Auth] Anonymous sign-in notice:', err?.message || err);
        });
      }
    });
  } catch (err) {
    console.warn('[Firebase Auth] Auth initialization notice:', err);
  }
};

/**
 * Sync user profile to Firestore
 */
export const syncUserProfileToFirestore = async (user: UserProfile): Promise<void> => {
  try {
    const docId = user.email ? user.email.replace(/[^a-zA-Z0-9]/g, '_') : 'current_user';
    const userDocRef = doc(db, USERS_COLLECTION, docId);
    await setDoc(
      userDocRef,
      {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn('[Firebase Firestore] syncUserProfile notice:', error);
  }
};

/**
 * Fetch remote products stored in Firestore
 */
export const fetchProductsFromFirestore = async (): Promise<Product[]> => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), limit(250));
    const snapshot = await getDocs(q);
    const remoteProducts: Product[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Product;
      if (data && data.id) {
        remoteProducts.push(data);
      }
    });
    return remoteProducts;
  } catch (error) {
    console.warn('[Firebase Firestore] fetchProducts notice:', error);
    return [];
  }
};

/**
 * Save or update a product in Firestore
 */
export const saveProductToFirestore = async (product: Product): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, String(product.id));
    await setDoc(docRef, product, { merge: true });
  } catch (error) {
    console.warn('[Firebase Firestore] saveProduct notice:', error);
  }
};

/**
 * Delete a product from Firestore
 */
export const deleteProductFromFirestore = async (productId: number): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, String(productId));
    await deleteDoc(docRef);
  } catch (error) {
    console.warn('[Firebase Firestore] deleteProduct notice:', error);
  }
};

/**
 * Fetch remote orders stored in Firestore
 */
export const fetchOrdersFromFirestore = async (): Promise<Order[]> => {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), limit(100));
    const snapshot = await getDocs(q);
    const remoteOrders: Order[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Order;
      if (data && data.id) {
        remoteOrders.push(data);
      }
    });
    return remoteOrders;
  } catch (error) {
    console.warn('[Firebase Firestore] fetchOrders notice:', error);
    return [];
  }
};

/**
 * Save a new order to Firestore
 */
export const saveOrderToFirestore = async (order: Order): Promise<void> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, order.id);
    await setDoc(docRef, order, { merge: true });
  } catch (error) {
    console.warn('[Firebase Firestore] saveOrder notice:', error);
  }
};

/**
 * Update an existing order status in Firestore
 */
export const updateOrderInFirestore = async (
  orderId: string,
  updates: Partial<Order>
): Promise<void> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.warn('[Firebase Firestore] updateOrder notice:', error);
  }
};

/**
 * Fetch remote reviews from Firestore
 */
export const fetchReviewsFromFirestore = async (): Promise<Review[]> => {
  try {
    const q = query(collection(db, REVIEWS_COLLECTION), limit(150));
    const snapshot = await getDocs(q);
    const remoteReviews: Review[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Review;
      if (data && data.id) {
        remoteReviews.push(data);
      }
    });
    return remoteReviews;
  } catch (error) {
    console.warn('[Firebase Firestore] fetchReviews notice:', error);
    return [];
  }
};

/**
 * Save a customer review to Firestore
 */
export const saveReviewToFirestore = async (review: Review): Promise<void> => {
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, review.id);
    await setDoc(docRef, review, { merge: true });
  } catch (error) {
    console.warn('[Firebase Firestore] saveReview notice:', error);
  }
};

/**
 * Fetch support email threads from Firestore
 */
export const fetchSupportThreadsFromFirestore = async <T extends { id: string }>(): Promise<T[]> => {
  try {
    const snapshot = await getDocs(collection(db, SUPPORT_COLLECTION));
    const threads: T[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as T;
      if (data && data.id) {
        threads.push(data);
      }
    });
    return threads;
  } catch (error) {
    console.warn('[Firebase Firestore] fetchSupportThreads notice:', error);
    return [];
  }
};

/**
 * Save or update a support email thread in Firestore
 */
export const saveSupportThreadToFirestore = async (thread: { id: string; [key: string]: any }): Promise<void> => {
  try {
    const docRef = doc(db, SUPPORT_COLLECTION, thread.id);
    await setDoc(docRef, thread, { merge: true });
  } catch (error) {
    console.warn('[Firebase Firestore] saveSupportThread notice:', error);
  }
};
