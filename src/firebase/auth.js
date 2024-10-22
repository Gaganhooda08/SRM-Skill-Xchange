import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const signupwithemailandpassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential; // Return the userCredential object
  } catch (error) {
    throw new Error(error.message); // Rethrow the error to handle it in the signup function
  }
};

export const loginwithemailandpassword = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};
