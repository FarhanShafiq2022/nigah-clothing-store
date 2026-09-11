/**
 * Firebase Configuration for ZARQASH Atelier
 * Seamlessly interfaces with Firebase Authentication and Cloud Firestore
 * with zero-fail fallback to local mock data when offline or not configured.
 */


export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyBuR5Yxs-0zMgZNIzIQRFu2MeFtulpSFm0",
  authDomain: "nigah-a20bf.firebaseapp.com",
  projectId: "nigah-a20bf",
  storageBucket: "nigah-a20bf.firebasestorage.app",
  messagingSenderId: "532031433127",
  appId: "1:532031433127:web:c09104325587e1f0c76e82",
  measurementId: "G-WSJJQ4ZD31"
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);
