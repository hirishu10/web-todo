import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCFO0TFcNbU7aPbgSYJYNj88EHHT_JsnGI",
  authDomain: "web-todo-1b65d.firebaseapp.com",
  projectId: "web-todo-1b65d",
  storageBucket: "web-todo-1b65d.appspot.com",
  messagingSenderId: "206435824579",
  appId: "1:206435824579:web:1f8b51b4553320afe68376",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbAuth = getFirestore(app);
export const provider = new GoogleAuthProvider();
