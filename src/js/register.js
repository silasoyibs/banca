import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast, loadingSpinner, clearLoadingSpinner } from "./common";
const form = document.querySelector("#form");
const btnRegister = document.getElementById("register-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      loadingSpinner(btnRegister);
      const user = userCredential.user;
      toast.success("Thanks for Registering!");
      toast.hide();
      setTimeout(() => {
        clearLoadingSpinner(btnRegister, "Create Account");
      }, 6000);
    })
    .catch((error) => {
      const errorCode = error.code;
      let errorMessage;
      switch (errorCode) {
        case "auth/weak-password":
          errorMessage = "password must be at least 6 characters long";
          break;
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "lease enter a valid email";
          break;
        default:
          errorMessage = error.message;
      }
      toast.error(errorMessage);
      toast.hide();
    });
});
