import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { loadingSpinner, clearLoadingSpinner } from "./common";
import { toast, clearForm, capitalizeName } from "./common";
import { createUserData } from "./dashboard/model";
const form = document.querySelector("#form");
const btnRegister = document.getElementById("register-button");
const formInput = document.querySelectorAll("input");

// form submittion
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const FullName = capitalizeName(document.querySelector("#FullName").value);
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  loadingSpinner(btnRegister);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed up
    const user = userCredential.user;
    await createUserData(user, FullName, email);
    clearForm(formInput);
    toast.success("Thanks for Registering!");
  } catch (error) {
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
  } finally {
    toast.hide();
    setTimeout(() => {
      clearLoadingSpinner(btnRegister, "Create Account");
    }, 6000);
  }
});
