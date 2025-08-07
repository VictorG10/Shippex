import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQajvpi-B_Sa8eQclp7_yiQuchRh231WM",
  authDomain: "shippex-44ad4.firebaseapp.com",
  projectId: "shippex-44ad4",
  //storageBucket: "shippex-44ad4.firebasestorage.app",
  storageBucket: "shippex-44ad4.appspot.com",
  messagingSenderId: "462687775940",
  appId: "1:462687775940:web:10502d78ce94a05778ed91",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };
