import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDwMSdXk0r4wIwx3MGQQhcSRh1zQlVNiYQ",
  authDomain: "nailspot-81f2a.firebaseapp.com",
  projectId: "nailspot-81f2a",
  storageBucket: "nailspot-81f2a.firebasestorage.app",
  messagingSenderId: "363025647966",
  appId: "1:363025647966:web:8bb4a9bb8ceb39a62de7cf",
  measurementId: "G-HLQBMWBS15"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);