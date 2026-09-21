// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBa03adqI9OlLT5Jp67cC1faaiBwtgtSoo",
  authDomain: "artisan-marketplace-56b94.firebaseapp.com",
  projectId: "artisan-marketplace-56b94",
  storageBucket: "artisan-marketplace-56b94.firebasestorage.app",
  messagingSenderId: "515704594373",
  appId: "1:515704594373:web:e752a828402af5382ab5ac"
};

// Initialize Firebase (prevent duplicate initialization)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
