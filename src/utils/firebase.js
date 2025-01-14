// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsHvzS5nl5aajRAV5Wlz-pb1sKiU_iaMY",
  authDomain: "netflix-gpt-cd7f3.firebaseapp.com",
  projectId: "netflix-gpt-cd7f3",
  storageBucket: "netflix-gpt-cd7f3.firebasestorage.app",
  messagingSenderId: "726954682835",
  appId: "1:726954682835:web:d9fc7345273a035ce46726",
  measurementId: "G-71E9CP1VE5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
