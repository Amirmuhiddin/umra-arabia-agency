import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDeGjq3OgYNd_6Orm3c3UVYpA1IWie3BbY",
  authDomain: "umraagency.firebaseapp.com",
  projectId: "umraagency",
  storageBucket: "umraagency.appspot.com",
  messagingSenderId: "311436950079",
  appId: "1:311436950079:web:e9a307feaa5f35a42c168a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;