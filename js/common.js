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

// Toast
class Toast {
  _parentElement = document.querySelector(".toastBox");
  _toastElement = document.querySelector(".toast");
  render(markup) {
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._parentElement.classList.add("active");
  }
  error(message) {
    const markupError = this.generateErrorMarkup(message);
    this.render(markupError);
  }
  generateErrorMarkup(message) {
    return `
       <div class="toast">
          <ion-icon class="toast-close-icon" name="close-outline"></ion-icon>
          <ion-icon
            class="toast-icon toast-icon--error"
            name="close-circle"
          ></ion-icon>
          <div>
            <span class="toast-message--tittle">Error</span>
            <span class="toast-message--text">${message}</span>
          </div>
        </div> 
    `;
  }
  generateSuccessMarkup(message) {
    return `
      <div class="toast">
            <ion-icon class="toast-close-icon" name="close-outline"></ion-icon>
            <ion-icon
              class="toast-icon toast-icon--success"
              name="checkmark-circle"
            ></ion-icon>
            <div>
              <span class="toast-message--tittle">Success</span>
              <span class="toast-message--text">${message}</span>
            </div>
        </div>
    `;
  }
  success(message) {
    const markupSucess = this.generateSuccessMarkup(message);
    this.render(markupSucess);
  }
}
export const toast = new Toast();
