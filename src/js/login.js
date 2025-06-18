import { clearLoadingSpinner, loadingSpinner, toast } from "./common";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const form = document.querySelector("#form");
const loginBtn = document.getElementById("login-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  loadingSpinner(loginBtn);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.href = "/dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage;
      switch (errorCode) {
        case "auth/invalid-login-credentials":
          errorMessage = "invalid login details";
          break;
        default:
          errorMessage = error.message;
      }
      toast.error(errorMessage);
    })
    .finally(() => {
      clearLoadingSpinner(loginBtn, "Login");
      toast.hide();
    });
});
