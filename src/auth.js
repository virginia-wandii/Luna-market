import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import app from "./firebase.js";

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

// Google sign-in
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Register with email and password
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login with email and password
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = () => {
  return signOut(auth);
};