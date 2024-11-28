import { db, auth, googleProvider } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const signIn = async (username: string, password: string) => {
  const email = `${username}@gmail.com`;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    document.cookie = `token=${token}; path=/`;
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signInDemo = async () => {
  const email = `demo@gmail.com`;
  const password = '12345678';
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    document.cookie = `token=${token}; path=/`;
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};


export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
