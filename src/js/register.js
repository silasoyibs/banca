import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
<<<<<<< HEAD
import { toast, loadingSpinner, clearLoadingSpinner } from "./common";
import { createUserData } from "./dashboard/model";
const form = document.querySelector("#form");
const btnRegister = document.getElementById("register-button");
const formInput = document.querySelectorAll("input");

// clear form input
function clearForm() {
  formInput.forEach((input) => {
    input.value = "";
  });
}

// form submittion
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const FullName = document.querySelector("#FullName").value;
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
    clearForm();
    toast.success("Thanks for Registering!");
    toast.hide();
    setTimeout(() => {
      clearLoadingSpinner(btnRegister, "Create Account");
    }, 6000);
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
    toast.hide();
  } finally {
    setTimeout(() => {
      clearLoadingSpinner(btnRegister, "Create Account");
    }, 6000);
  }
=======
import { toast, changeSubmitText } from "./common";
const form = document.querySelector("#form");
const btnSubmit = document.querySelector("#submit-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      changeSubmitText(btnSubmit, "Registering...");
      const user = userCredential.user;
      console.log(user);
      toast.success("Thanks for Registering!");
      toast.hide();
      setTimeout(() => {
        changeSubmitText(btnSubmit, "Register");
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
>>>>>>> 79f5a6376b044f15886be944a33fbefe47628069
});
