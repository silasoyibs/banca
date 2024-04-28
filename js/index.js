import { navLinkActive, navLinks, activePage } from "./common";
import { showBtnAnimation } from "./common";
import { btnCta } from "./common";
import { addDoc } from "firebase/firestore";
import { colRef } from "./firebase";
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
    emailForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();
        if (!emailForm.subcriberemail.value) return;
        await addDoc(colRef, {
          email: emailForm.subcriberemail.value
            .toLowerCase()
            .replace(/\s/g, ""),
        });
        emailForm.reset();
      } catch {
        console.log("something went wrong");
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const home = new Home();
});
