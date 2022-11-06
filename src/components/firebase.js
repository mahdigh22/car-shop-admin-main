import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp ({
  apiKey: "AIzaSyAg7JyZ7GK7E5usW8BTvLUI7zOQNb27dJ8",
  authDomain: "car-shop-cb0a5.firebaseapp.com",
  projectId: "car-shop-cb0a5",
  storageBucket: "car-shop-cb0a5.appspot.com",
  messagingSenderId: "281706051090",
  appId: "1:281706051090:web:a050a5f6875a73d295cacb",
  measurementId: "G-33KGKP5RVT"
});
const storage = getStorage(app);
export default storage;
