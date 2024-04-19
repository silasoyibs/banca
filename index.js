import { navLinkActive, navLinks, activePage } from "./navLink";
import { showBtnAnimation } from "./navLink";
import { btnCta } from "./navLink";
// HomePage
class Home {
  constructor() {
    this.init();
  }
  init() {
    navLinkActive(navLinks, activePage);
    showBtnAnimation(btnCta);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const home = new Home();
});
