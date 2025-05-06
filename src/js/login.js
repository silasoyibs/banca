import { loadingSpinner } from "./common";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const form = document.querySelector("#form");
const loginBtn = document.getElementById("login-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      loadingSpinner(loginBtn);
      // Signed in
      const user = userCredential.user;
      window.location.href = "https:/banca-liard.vercel.app/dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
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
    });
});
