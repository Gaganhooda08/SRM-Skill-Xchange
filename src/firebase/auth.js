import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const signupwithemailandpassword = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password);
};

export const loginwithemailandpassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};
