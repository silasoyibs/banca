import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIza SyB1mzdiohYfSTIkO236twOySmjV7WxPCzI",
  authDomain: "banca-19510.firebaseapp.com",
  projectId: "banca-19510",
  storageBucket: "banca-19510.appspot.com",
  messagingSenderId: "962258653236",
  appId: "1:962258653236:web:2dacb9d45e156801723a61",
};

// intialize app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// get database
<<<<<<< HEAD
export const db = getFirestore();
=======
const db = getFirestore();
>>>>>>> 79f5a6376b044f15886be944a33fbefe47628069
// get collection from database
export const emailSubcriber = collection(db, "email-subcriber");
export const contactUs = collection(db, "contact-us-form");
export const loanApplication = collection(db, "loan-application");

// get all emailSubcriber list
export async function checkEmailSubcriber(emailToCheck) {
  const { docs } = await getDocs(emailSubcriber);
  const emailSubcribers = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
<<<<<<< HEAD
=======
  console.log(emailSubcribers);
>>>>>>> 79f5a6376b044f15886be944a33fbefe47628069
  const emailExist = emailSubcribers.some(
    (subcriber) => subcriber.email === emailToCheck
  );
  if (emailExist) throw new Error("you are already a subcriber");
}
