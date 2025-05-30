import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const state = {
  user: {},
  transactions: [],
  transactionsAmount: [],
  userRef: null,
  userTransactionsRef: null,
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
      state.userTransactionsRef = transactionsRef;
      // state.dataFetched = true;
      // return currentUser;
    }
    state.userRef = userRef;
  } catch (error) {
    console.error(error.message);
  }
}
// get reciepient details from firebase
async function getRecipientData(recipientAccountNumber) {
  // get all banca users
  const usersRef = collection(db, "users");
  // query banca user based on account number
  const recipientDataQuery = query(
    usersRef,
    where("accountNumber", "==", recipientAccountNumber)
  );
  // get query docs
  const docSnapshot = await getDocs(recipientDataQuery);
  if (!docSnapshot.empty) {
    // Get the matched reciepientUser
    const recipientId = docSnapshot.docs[0].id;
    const recipientData = {
      id: recipientId,
      ...docSnapshot.docs[0].data(),
    };
    const recipientRef = doc(db, "users", recipientId);
    // Now get transactions from subcollection
    const recipientTransactionsRef = collection(
      db,
      `users/${recipientId}/transaction`
    );
    // get transaction query
    const transactionSnapShot = await getDocs(recipientTransactionsRef);
    const recipientTransactionsData = transactionSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return {
      recipientId,
      recipientData,
      recipientRef,
      recipientTransactionsRef,
      recipientTransactionsData,
    };
  } else {
    throw new Error("recipient not found");
  }
}

// send money to another banca user (transfer)
export async function transfer(transfer) {
  try {
    const { recipientAccountNumber, amount } = transfer;
    await sendMoney(amount, recipientAccountNumber);
    return "transfer successful!";
  } catch (error) {
    console.log(error, error.message);
    return "transfer failed";
  }
}
// send/recive money in banca
async function sendMoney(amount, recipientAccountNumber) {
  const senderName = state.user.fullName;
  const { user, userRef } = state;
  const { userTransactionsRef } = state;
  const { recipientData, recipientRef, recipientTransactionsRef } =
    await getRecipientData(recipientAccountNumber);
  // update sender database
  if (user.balance >= amount) {
    // debit banca user
    const balance = user.balance - amount;
    await updateDoc(userRef, {
      balance: balance,
    });
    // update sender transaction ref
    const recieverName = recipientData.fullName;
    addDoc(userTransactionsRef, {
      recieverName,
      amount: -amount,
      date: new Date().toISOString(),
      type: "withdrawal",
    });
  } else {
    console.log("something went wrong");
  }

  // update recipient database
  if (recipientData) {
    // credit banca user
    const balance = user.balance + amount;
    await updateDoc(recipientRef, {
      balance: balance,
    });
    // update recipient transactions list
    await addDoc(recipientTransactionsRef, {
      senderName,
      amount,
      date: new Date().toISOString(),
      type: "deposit",
    });
  } else {
    console.log("recipient could not be found");
  }
}
