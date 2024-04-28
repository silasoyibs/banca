export const navLinks = document.querySelectorAll(".nav__link");
export const activePage = window.location.pathname.split("/")[1];
export const btnCta = document.querySelectorAll(".btn-cta");

// Nav Active Link
export const navLinkActive = function (navLinks, activePage) {
  navLinks.forEach((link) => {
    const linkName = link.href.split("/");
    const linkLength = linkName.length;
    const splitedLink = linkName[linkLength - 1];
    if (splitedLink === activePage) {
      link.classList.add("activeLink");
    }
  });
};

// Nav Button Animation
export const showBtnAnimation = function (btnCta) {
  btnCta.forEach((btnCta) => {
    btnCta.addEventListener("mouseover", () => {
      btnCta.classList.add("show-unfillanimation");
    });
  });
};
