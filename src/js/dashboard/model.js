import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const state = {
  user: {},
  transactions: [],
  transactionsAmount: [],
  dataFetched: false,
};

// Creating New Banca user Data
export async function createUserData(user, fullName, email) {
  // banca account number for new user
  const accountNumber = generateAccountNum();
  const userName = generateUserName(fullName);

  // Add New User to th Users database
  await setDoc(doc(db, "users", user.uid), {
    fullName: fullName,
    userName: userName,
    email: email,
    balance: 0,
    accountNumber: accountNumber,
  });

  //   initializing user transaction
  await addDoc(collection(db, "users", user.uid, "transaction"), {
    type: "initial deposit",
    amount: 0,
    timestamp: serverTimestamp(),
  });
}

// Generating 10 Digit Banca Account Number
function generateAccountNum() {
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return randomNumber;
}

// Generate UserName
function generateUserName(fullName) {
  const firstName = fullName.split(" ");
  return firstName[0];
}

// wait for user Auth
function waitForUserAuth() {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // stop listening after the first response
      if (user) resolve(user);
      else reject(new Error("No user signed in"));
    });
  });
}

// Get User Data From Firebase
export async function getCurrentUserData() {
  const user = await waitForUserAuth();
  // Don't fetch again if we already have data
  if (state.dataFetched && state.user.id === user?.uid) {
    return {
      data: state.user,
      transactions: state.transactions,
    };
  }
  // No signed-in user
  if (!user) throw new Error("No user signed in");
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = {
        id: userSnap.id,
        ...userSnap.data(),
      };
      const transactionsRef = collection(db, "users", user.uid, "transaction");
      const transactionsSnap = await getDocs(transactionsRef);
      const transactions = transactionsSnap.docs.map((doc) => doc.data());
      const currentUser = {
        data,
        transactions,
      };
      // modify existing state of current user
      state.user = data;
      state.transactions = [...transactions];
      state.transactionsAmount = state.transactions.map(
        (transaction) => transaction.amount
      );
      state.dataFetched = true;
      return currentUser;
    }
  } catch (error) {
    console.error(error.message);
  }
}
