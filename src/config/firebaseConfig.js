import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-8Lk0C7v1sozlegjZI0b6VRmYDx0VHvk",
  authDomain: "nota10-f1204.firebaseapp.com",
  projectId: "nota10-f1204",
  storageBucket: "nota10-f1204.appspot.com",
  messagingSenderId: "97780789286",
  appId: "1:97780789286:web:f75f31fd672817088ff6e7",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };