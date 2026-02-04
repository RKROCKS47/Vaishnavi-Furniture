// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDuTgZHCNyyEzNTJVoTpfhAC_nucZT_mt0",
  authDomain: "vaishnavi-furniture-4b2d9.firebaseapp.com",
  projectId: "vaishnavi-furniture-4b2d9",

  // 🔥 FIX IS HERE
  storageBucket: "vaishnavi-furniture-4b2d9.appspot.com",

  messagingSenderId: "433702283959",
  appId: "1:433702283959:web:98c6dff6368800755fbb32",
  measurementId: "G-7JJ176D4XJ"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export
export { app, auth, db };
