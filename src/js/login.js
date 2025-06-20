import { clearLoadingSpinner, loadingSpinner, toast } from "./common";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
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
      sessionStorage.setItem("authenticated", "true");
      window.location.href = "/dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      let errorMessage;
      switch (errorCode) {
        case "auth/invalid-login-credentials":
          errorMessage = "Invalid login email or password";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter valid email";
          break;
        default:
          errorMessage = "Something went wrong. Try again";
      }
      toast.error(errorMessage);
    })
    .finally(() => {
      clearLoadingSpinner(loginBtn, "Login");
      toast.hide();
    });
});
