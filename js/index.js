import {
  navLinkActive,
  navLinks,
  activePage,
  showBtnAnimation,
  btnCta,
  toast,
  validateEmail,
} from "./common";
import { addDoc } from "firebase/firestore";
import { emailSubcriber } from "./firebase";
// variables declaration
const emailForm = document.querySelector(".email");
// HomePage
class Home {
  constructor() {
    this.init();
  }
  init() {
    navLinkActive(navLinks, activePage);
    showBtnAnimation(btnCta);
    this.getEmailSubcriber();
  }
  getEmailSubcriber() {
    const btnSubcriberText = document.querySelector(".email-subcriber-text");
    emailForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();
        const email = emailForm.subcriberemail.value.toLowerCase().trim();
        if (!email) {
          throw new Error("please enter your email");
        }
        if (!validateEmail(email)) {
          throw new Error("please enter a valid email");
        }
        btnSubcriberText.textContent = "Submitting...";
        if (!navigator.onLine) {
          throw new Error("please check your internet connection");
        }
        await addDoc(emailSubcriber, {
          email: email,
        });
        toast.success("Thank you for subscribing!");
        toast.hide();
        setTimeout(() => {
          btnSubcriberText.textContent = "Get Started";
        }, 6000);
        emailForm.reset();
      } catch (error) {
        btnSubcriberText.textContent = "Get Started";
        toast.error(error.message);
        toast.hide();
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const home = new Home();
});
