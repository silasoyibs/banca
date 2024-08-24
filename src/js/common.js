export const navLinks = document.querySelectorAll(".nav__link");
export const btnCta = document.querySelectorAll(".btn-cta");

// Nav Active Link
export const navLinkActive = function (navLinks) {
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.forEach((link) => {
        link.classList.remove("activeLink");
      });
      e.target.classList.add("activeLink");
    }); 
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

// Tablet Navigation
export function tabletNav(){
  const tabletNav = document.querySelector('.tablet-nav--container');
  const closeMenuBtn = document.querySelector('.tablet-nav--container-btn-close');
  const tabHamburgerMenu = document.querySelector(".navbar-toggler");
  const fixedBody=document.querySelector('html');

  tabHamburgerMenu.addEventListener('click',()=>{
    tabletNav.classList.toggle('open-tablet-menu');
    fixedBody.classList.toggle('fixed')
  })
  closeMenuBtn.addEventListener('click',()=>{
    tabletNav.classList.remove('open-tablet-menu');
    fixedBody.classList.remove('fixed');
  })
}

// Toast notification
class Toast {
  _parentElement = document.querySelector(".toastBox");
  render(markup) {
    this._parentElement.innerHTML = "";
    this._parentElement.classList.add("active");
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  generateErrorMarkup(message) {
    return `
       <div class="toast">
          <ion-icon class="toast-close-icon" name="close"></ion-icon>
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
      <div class="toast ">
            <ion-icon class="toast-close-icon" name="close"></ion-icon>
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
  renderSuccessMessage(message) {
    const markupSucess = this.generateSuccessMarkup(message);
    this.render(markupSucess);
  }

  renderErrorMessage(message) {
    const markupError = this.generateErrorMarkup(message);
    this.render(markupError);
  }

  close() {
    const toastClose = document.querySelector(".toast-close-icon");
    toastClose.addEventListener("click", () => {
      this._parentElement.classList.remove("active");
    });
  }
  active() {
    const toast = document.querySelector(".toast");
    setTimeout(() => {
      toast.classList.add("active");
    }, 10);
  }
  hide() {
    setTimeout(() => {
      this._parentElement.classList.remove("active");
    }, 6000);
  }
  success(message) {
    this.renderSuccessMessage(message);
    this.active();
    this.close();
  }
  error(message) {
    this.renderErrorMessage(message);
    this.active();
    this.close();
  }
}
export const toast = new Toast();

// email validation function
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


