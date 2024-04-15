"use strict";
class Home {
  constructor() {
    this.navLinkActive();
  }
  navLinkActive() {
    const navLinks = document.querySelectorAll(".nav__link");
    navLinks.forEach((link) => {
      // remove active class
      link.classList.remove("activeLink");
      link.addEventListener("click", (e) => {
        e.preventDefault();
        navLinks.forEach((navLink) => {
          navLink.classList.remove("activeLink");
        });
        // add activeLink class to clicked nav linked
        link.classList.add("activeLink");
        // get attribute of current link
        const href = link.getAttribute("href");
        // update link href when clicked
        window.location.href = href;
        if (href === window.location.href) {
          link.classList.add("activeLink");
        } else {
          link.classList.remove("activeLink");
        }
      });
    });
  }
  getSelector(className) {
    return document.querySelector(`.+${className}`);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const home = new Home();
});
