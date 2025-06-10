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
  totalIncome: null,
  totalExpense: null,
  userRef: null,
  userTransactionsRef: null,
};

// creating New Banca user Data
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

// generating 10 Digit Banca Account Number
function generateAccountNum() {
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return randomNumber;
}

// generate username
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

// get user data from firebase
export async function getCurrentUserData() {
  const user = await waitForUserAuth();
  if (!user) throw new Error("No user signed in");
  const userId = user.uid;
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = {
        id: userSnap.id,
        ...userSnap.data(),
      };
      const transactionsRef = collection(db, "users", userId, "transaction");
      const transactionsSnap = await getDocs(transactionsRef);
      const transactions = transactionsSnap.docs
        .map((doc) => doc.data())
        .sort((a, b) => new Date(b.date) - new Date(a.date));
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
      state.totalIncome = calculateTotalIncome(state.transactionsAmount);
      state.totalExpense = calculateTotalExpense(state.transactionsAmount);
      state.userTransactionsRef = transactionsRef;
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
  const { user, userRef, userTransactionsRef } = state;
  const { recipientData, recipientRef, recipientTransactionsRef } =
    await getRecipientData(recipientAccountNumber);
  // update sender database
  if (
    user.balance >= amount &&
    Number(recipientAccountNumber) !== Number(user.accountNumber)
  ) {
    // debit banca user
    const balance = user.balance - amount;
    await updateDoc(userRef, {
      balance: balance,
    });

    // update sender transaction ref
    const name = recipientData.fullName;
    addDoc(userTransactionsRef, {
      name,
      amount: -amount,
      date: new Date().toISOString(),
      type: "withdrawal",
    });
  } else {
    throw new Error("something went wrong");
  }

  // update recipient database
  if (recipientData) {
    const name = state.user.fullName;
    // credit banca user
    depositMoney(
      recipientData,
      recipientRef,
      recipientTransactionsRef,
      amount,
      name
    );
    // const balance = recipientData.balance + amount;
    // await updateDoc(recipientRef, {
    //   balance: balance,
    // });
    // // update recipient transactions list
    // await addDoc(recipientTransactionsRef, {
    //   senderName,
    //   amount,
    //   date: new Date().toISOString(),
    //   type: "deposit",
    // });
  } else {
    throw new Error("recipient could not be found");
  }
}
// calculate total transaction income and expenses
function calculateTotalIncome(transactionList) {
  return transactionList
    .filter((amount) => amount > 0)
    .reduce((acc, amount) => acc + amount, 0);
}
function calculateTotalExpense(transactionList) {
  return transactionList
    .filter((amount) => amount < 0)
    .reduce((acc, amount) => acc + amount, 0);
}
// listen to balance changes
export function listenToBalance(handleBalanceChange) {
  const userId = state.user.id;
  const userRef = doc(db, "users", userId);
  onSnapshot(userRef, (docSnap) => {
    const newBalance = docSnap.data().balance;
    state.user.balance = newBalance;
    handleBalanceChange(newBalance);
  });
}
// listen to transaction changes
export function listenToTransaction(handleTransactionChange) {
  const userId = state.user.id;
  const transactionRef = collection(db, "users", userId, "transaction");
  onSnapshot(transactionRef, (querySnapshot) => {
    const newTransaction = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    const newTransactionAmount = newTransaction.map(
      (transaction) => transaction.amount
    );
    const newTotalIncome = calculateTotalIncome(newTransactionAmount);
    const newTotalExpense = calculateTotalExpense(newTransactionAmount);
    // update state of application
    state.transactions = newTransaction;
    state.totalIncome = newTotalIncome;
    state.totalExpense = newTotalExpense;
    handleTransactionChange(newTransaction, newTotalIncome, newTotalExpense);
  });
}

// fund banca account
export async function fundAccount(fundAmount) {
  const { user, userRef, userTransactionsRef } = state;
  const name = "Self Funding";
  try {
    const handler = PaystackPop.setup({
      key: "pk_test_86d236442aa4f6fd2b610b3d8838d7737184036f", // from Paystack dashboard
      email: state.user.email, // use the actual logged-in user
      amount: fundAmount * 100, // amount in kobo
      currency: "NGN",
      callback: function (response) {
        // verify the transaction here
        "Payment complete! Reference: " + response.reference;
        // You can now call your backend to update wallet
        console.log(user, userRef, userTransactionsRef, fundAmount, name);
        depositMoney(user, userRef, userTransactionsRef, fundAmount, name);
        console.log("funding successful");
      },
      onClose: function () {
        alert("Transaction was not completed");
      },
    });

    handler.openIframe();
  } catch (err) {
    console.log("funding went wrong", err);
  }
}

async function depositMoney(user, userRef, transactionRef, amount, name) {
  try {
    // credit banca user
    const balance = user.balance + amount;
    await updateDoc(userRef, {
      balance: balance,
    });
    // update transactions list
    await addDoc(transactionRef, {
      name,
      amount,
      date: new Date().toISOString(),
      type: "deposit",
    });
  } catch (err) {
    throw new Error("transaction not successful");
  }
}
