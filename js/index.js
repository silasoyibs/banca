import {
  navLinks,
  navLinkActive,
  showBtnAnimation,
  btnCta,
  toast,
  validateEmail,
} from "./common";
import { addDoc } from "firebase/firestore";
import { emailSubcriber, contactUs } from "./firebase";
// variables declaration
const emailForm = document.querySelector(".email");
const contactUsForm = document.querySelector(".contact-us__form");
// HomePage
class Home {
  constructor() {
    this.init();
  }
  init() {
    navLinkActive(navLinks);
    showBtnAnimation(btnCta);
    this.getEmailSubcriber();
    this.getContactUs();
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
        this.changeSubmitText(btnSubcriberText, "submitting...");
        if (!navigator.onLine) {
          throw new Error("please check your internet connection");
        }
        await addDoc(emailSubcriber, {
          email: email,
        });
        toast.success("Thank you for subscribing!");
        toast.hide();
        setTimeout(() => {
          this.changeSubmitText(btnSubcriberText, "Get Started");
        }, 6000);
        emailForm.reset();
      } catch (error) {
        this.changeSubmitText(btnSubcriberText, "Get Started");
        toast.error(error.message);
        toast.hide();
      }
    });
  }

  getContactUs() {
    const btnContactUsText = document.querySelector(".btn-contactus-text");
    contactUsForm.addEventListener("submit", async (e) => {
      const email = contactUsForm.email.value.trim();
      const fullname = contactUsForm.fullname.value.trim();
      const message = contactUsForm.message.value.trim();
      try {
        e.preventDefault();
        if (!email || !fullname || !message) {
          throw new Error("please fill in all fields");
        }
        if (!navigator.onLine) {
          throw new Error("please check your internet connection");
        }
        this.changeSubmitText(btnContactUsText, "Submitting...");
        await addDoc(contactUs, {
          fullname: fullname,
          email: email,
          message: message,
        });
        toast.success("thanks for contacting us");
        toast.hide();
        setTimeout(() => {
          this.changeSubmitText(btnContactUsText, "Submit");
        }, 6000);
        contactUsForm.reset();
      } catch (error) {
        this.changeSubmitText(btnContactUsText, "Submit");
        toast.error(error.message);
        toast.hide();
      }
    });
  }

  changeSubmitText(elementclass, text) {
    return (elementclass.textContent = text);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const home = new Home();
});
