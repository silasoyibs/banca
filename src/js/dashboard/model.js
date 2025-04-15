import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// Creating New Banca user Data
export async function createUserData(user, fullName, email) {
  // banca account number for new user
  const accountNumber = generateAccountNum();

  // Add New User to th Users database
  setDoc(doc(db, "users", user.uid), {
    fullName: fullName,
    email: email,
    balance: 0,
    accountNumber: accountNumber,
  });

  //   initializing user transaction
  await addDoc(collection(db, "users", user.uid, "transaction"), {
    type: "initial deposit",
    amount: 0,
    timestamp: serverTimestamp(),
    description: "Account created, no initial deposit",
  });
}

// Generating 10 Digit Banca Account Number
function generateAccountNum() {
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return randomNumber;
}
