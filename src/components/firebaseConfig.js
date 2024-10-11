// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import storage functionality

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_pUkiwpRt9ZLYxDEco1K-HWzXK_kGMEo",
  authDomain: "printz-58556.firebaseapp.com",
  projectId: "printz-58556",
  storageBucket: "printz-58556.appspot.com",
  messagingSenderId: "163269177824",
  appId: "1:163269177824:web:cb81d9251c2b888ba8fb85",
  measurementId: "G-2QKWTL16Z3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { storage }; // Export storage to use it in other components
