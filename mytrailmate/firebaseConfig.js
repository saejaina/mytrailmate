// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWtB6VAsf1HrhTDyaFsYmG2fcHIv8ib_I",
  authDomain: "mytrailmate-9355d.firebaseapp.com",
  projectId: "mytrailmate-9355d",
  storageBucket: "mytrailmate-9355d.firebasestorage.app",
  messagingSenderId: "308031298047",
  appId: "1:308031298047:web:ff9cc4e68644620d54efca",
  measurementId: "G-XY6ZE8TJYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;