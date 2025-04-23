<<<<<<< HEAD
import { loadingSpinner } from "./common";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const form = document.querySelector("#form");
const loginBtn = document.getElementById("login-button");
=======
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const form = document.querySelector("#form");
>>>>>>> 79f5a6376b044f15886be944a33fbefe47628069

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
<<<<<<< HEAD
      loadingSpinner(loginBtn);
=======
>>>>>>> 79f5a6376b044f15886be944a33fbefe47628069
      // Signed in
      const user = userCredential.user;
      window.location.href = "http://localhost:1234/dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
<<<<<<< HEAD
      console.log(errorCode, errorMessage);
      // const errorCode = error.code;
      // let errorMessage;
      // switch (errorCode) {
      //   case "auth/invalid-login-credentials":
      //     errorMessage = "invalid login details";
      //     break;
      //   default:
      //     errorMessage = error.message;
      // }
      // toast.error(errorMessage);
      // toast.hide();
=======
      alert(errorMessage);
>>>>>>> 79f5a6376b044f15886be944a33fbefe47628069
    });
});
