// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPvBnswQmIOj7c2S4SMtdz3Umqqdv8sks",
  authDomain: "car-shop-admin.firebaseapp.com",
  projectId: "car-shop-admin",
  storageBucket: "car-shop-admin.appspot.com",
  messagingSenderId: "734349759790",
  appId: "1:734349759790:web:70d1a3c6e85fe4883696bf",
  measurementId: "G-2HJ2CLHFY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);