import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { loadingSpinner, clearLoadingSpinner } from "./common";
import { toast, changeSubmitText } from "./common";
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

// Capitalize FullName
function capitalizeName(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

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
  });
});

// <div class="transaction__history__item">
// <div class="u-flex u-gap-small u-flex-v-center">
//   <figure class="user-picture">
//     <img src=${userAvatar} alt="user-picture" />
//   </figure>
//   <div class="transaction-details">
//     <p>Idris Saidu</p>
//     <p class="transaction-details__date">Aug 8,2024-02:26</p>
//   </div>
// </div>
// <div>
//   <p class="debit">₦<span>700</span></p>
// </div>
// </div>

// <div class="transaction__history__item">
// <div class="u-flex u-gap-small u-flex-v-center">
//   <figure class="user-picture">
//     <img src=${userAvatar}  alt="user-picture" />
//   </figure>
//   <div class="transaction-details">
//     <p>Idris Saidu</p>
//     <p class="transaction-details__date">Aug 8,2024-02:26</p>
//   </div>
// </div>
// <div>
//   <p class="credit">₦<span>700</span></p>
// </div>
// </div>
