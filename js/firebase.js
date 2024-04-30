import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Firestore,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIza SyB1mzdiohYfSTIkO236twOySmjV7WxPCzI",
  authDomain: "banca-19510.firebaseapp.com",
  projectId: "banca-19510",
  storageBucket: "banca-19510.appspot.com",
  messagingSenderId: "962258653236",
  appId: "1:962258653236:web:2dacb9d45e156801723a61",
};

// intialize app
initializeApp(firebaseConfig);
// get database
const db = getFirestore();
// get collection from database
export const emailSubcriber = collection(db, "email-subcriber");

// ="email
// btn-cta
// const btn = document.querySelector();

// let account = [];

// getDocs(colRef).then((snapshot) => {
//   let accounts = [];
//   snapshot.docs.forEach((account) => {
//     accounts.push({ ...account.data(), id: account.id });
//   });
//   console.log(accounts);
// });

// emailForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log("working");
//   addDoc(colRef, {
//     email: emailForm.subcriberemail.value,
//   }).then(emailForm.reset());
// });
