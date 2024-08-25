import {
  navLinks,
  navLinkActive,
  tabletNav,
  showBtnAnimation,
  btnCta,
  toast,
  validateEmail,
} from "./common.js";
import { addDoc } from "firebase/firestore";
import {
  emailSubcriber,
  contactUs,
  loanApplication,
  checkEmailSubcriber,
} from "./firebase.js";

// HomePage
class Home {
  constructor() {
    this.init();
  }
  init() {
    navLinkActive(navLinks);
    showBtnAnimation(btnCta);
    tabletNav();
    this.getEmailSubcriber();
    this.getContactUs();
    this.getLoanApplication();
  }
  getEmailSubcriber() {
    const emailForm = document.querySelector(".email");
    const btnSubcriberText = document.querySelector(".email-subcriber-text");
    emailForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();
        const email = emailForm.subcriberemail.value.toLowerCase().trim();
        if (!email) {
          throw new Error("please enter your email");
        }
        await checkEmailSubcriber(email);
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
        toast.success("Thanks for subscribing!");
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

  getLoanApplication() {
    const loanForm = document.querySelector(".loan-calculator__form");
    const accountNumberField = document.querySelector(".loan-account-number");
    const numberFields = document.querySelectorAll("input[type='number']");
    const btnLoan = document.querySelector(".btn-loan-text");
    const amountOfMoney = document.querySelector("input[name='amountOfMoney']");
    const repayments = document.querySelector("input[name='repayments']");
    // Ensure all number field accept number as variables
    numberFields.forEach((numberField) => {
      numberField.addEventListener("keydown", (e) => {
        if (
          !(
            e.key === "Backspace" ||
            e.key === "Delete" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === "Tab" ||
            e.key === "Enter"
          ) &&
          !(e.key >= "0" && e.key <= "9")
        )
          e.preventDefault();
      });
    });
    // repayment
    amountOfMoney.addEventListener("input", (e) => {
      const requestedAmount = Number(e.target.value);
      const repaymentAmount = requestedAmount + requestedAmount * 0.1;
      repayments.value = repaymentAmount;
    });
    //Maximum number of 10 for account number
    accountNumberField.addEventListener("input", (e) => {
      const inputValue = e.target.value;
      if (inputValue.length > 10);
      e.target.value = inputValue.slice(0, 10);
    });

    // Loan application submission
    loanForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();
        const loanType = loanForm.typeOfLoan.value;
        const accountNumber = Number(loanForm.bancaAccountNumber.value.trim());
        const repayments = Number(loanForm.repayments.value.trim());
        const amountOfMoney = Number(loanForm.amountOfMoney.value.trim());
        if (!loanType || !amountOfMoney || !accountNumber || !repayments) {
          throw new Error("please fill all fields");
        }
        this.changeSubmitText(btnLoan, "Applying...");
        if (!navigator.onLine) {
          throw new Error("please check your internet connection");
        }
        await addDoc(loanApplication, {
          loanType: loanType,
          amountOfMoney: amountOfMoney,
          accountNumber: accountNumber,
          repayments: repayments,
        });
        toast.success("Congratulations! Your application was successful!");
        toast.hide();
        setTimeout(() => {
          this.changeSubmitText(btnLoan, "Apply For Loans");
        }, 6000);
        loanForm.reset();
      } catch (error) {
        this.changeSubmitText(btnLoan, "Apply For Loans");
        toast.error(error.message);
        toast.hide();
        loanForm.reset();
      }
    });
  }

  getContactUs() {
    const contactUsForm = document.querySelector(".contact-us__form");
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
        if (!validateEmail(email)) {
          throw new Error("Enter a valid email");
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
