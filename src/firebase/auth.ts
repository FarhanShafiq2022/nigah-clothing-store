import {
  GoogleAuthProvider,
  onAuthStateChanged as subscribeToAuthState,
  signInWithPopup,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { auth } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isGuest?: boolean;
}

export const ADMIN_EMAIL = 'hr.technofi@gmail.com';

export const isAdminEmail = (email?: string | null) =>
  email?.trim().toLowerCase() === ADMIN_EMAIL;

const googleProvider = new GoogleAuthProvider();

const mapFirebaseUser = (user: User | null): UserProfile | null => {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email ?? '',
    displayName: user.displayName ?? user.email?.split('@')[0] ?? 'Google User',
    photoURL: user.photoURL ?? undefined,
    isGuest: false
  };
};

export const authService = {
  getCurrentUser(): UserProfile | null {
    return mapFirebaseUser(auth.currentUser);
  },
  async signInWithGoogle(): Promise<UserProfile> {
    const result = await signInWithPopup(auth, googleProvider);
    return mapFirebaseUser(result.user) as UserProfile;
  },
  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  },
  onAuthStateChanged(callback: (user: UserProfile | null) => void) {
    return subscribeToAuthState(auth, (user) => callback(mapFirebaseUser(user)));
  }
};
