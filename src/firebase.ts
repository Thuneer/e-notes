import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCMHgfkKynF1C7OnMYfyYJ0qh-jjEEllD0',
  authDomain: 'e-notes-e1556.firebaseapp.com',
  projectId: 'e-notes-e1556',
  storageBucket: 'e-notes-e1556.appspot.com',
  messagingSenderId: '45242024799',
  appId: '1:45242024799:web:f995d502809987881e2cea',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
