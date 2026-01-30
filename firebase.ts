import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7HJeKXVd8yiky00H3AB2RH0PXNB0sEpQ",
    authDomain: "smartmateai-a9ff0.firebaseapp.com",
    projectId: "smartmateai-a9ff0",
    storageBucket: "smartmateai-a9ff0.firebasestorage.app",
    messagingSenderId: "152866528417",
    appId: "1:152866528417:web:19279dbb91bbe5b6a964e0",
    measurementId: "G-Y3RG1QMSE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
