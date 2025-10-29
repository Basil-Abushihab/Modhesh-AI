// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyAy3cpUEbv9FcQuLfoIvQRPBFqPfIPJrbg',
  authDomain: 'modhesh-ai.firebaseapp.com',
  projectId: 'modhesh-ai',
  storageBucket: 'modhesh-ai.firebasestorage.app',
  messagingSenderId: '285717116515',
  appId: '1:285717116515:web:7f6c1809f073c00382aa56',
  measurementId: 'G-NB2Y38QFGK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
