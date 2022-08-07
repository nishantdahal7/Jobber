import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkMOks487ckr5iu7fDD_pQzQs9OB-9kao",
  authDomain: "job-caster-da2e1.firebaseapp.com",
  databaseURL:
    "https://job-caster-da2e1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "job-caster-da2e1",
  storageBucket: "job-caster-da2e1.appspot.com",
  messagingSenderId: "234614853395",
  appId: "1:234614853395:web:d234e455cfddb00671d4e6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;

// USER REGISTER -> UUID -> ON BOARD -> BUYER | PROVIDER, full name, Skills, Nationality, Pay rate, time ( full time | part time ) -> Dashboard
