import dasboardAtmCard from "../../img/dashboard-img-card.png";
import emptyTransaction from "../../img/SVG/empty-transaction.svg";
import userAvatar from "../../img/SVG/user.svg";

let darkModeBound = false;

export default class View {
  data;

  constructor() {
    if (!darkModeBound) {
      this._setUpStoredDarkMode();
      this._addHandlerDarkModeToggle();
      darkModeBound = true;
    }
  }

  render(data) {
    this.data = data;
    if (
      !this.data ||
      !this.data.user ||
      Object.keys(this.data.user).length === 0
    )
      return;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._addEventHandler?.();
  }

  renderSpinner() {
    const markup = `
     <div class="spinner-container">
        <div class="page-spinner"></div> 
     </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _addEventHandler() {
    this.addHandlerSetDarkMode?.();
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  clearForm(formElements) {
    formElements.forEach((el) => (el.value = ""));
  }

  headerMarkUp() {
    const isDark = document.documentElement.classList.contains("dark-mode");
    return `
      <div class="header-nav">
        <div class="header-nav__left">
          <div class="customer-welcome">
            <p>
              Welcome Back<span class="customer-welcome__name">${
                this.data.user.userName
              }</span>
            </p>
            <figure class="user-picture--welcome">
              <img src=${userAvatar} />
            </figure>
          </div>
        </div>
        <div class="header-nav__right">
          <div class="header-icons">
            <div class="u-flex u-flex-v-center u-gap-small">
              <ion-icon name="wallet"></ion-icon>
              <p>₦<span class="banca-user-balance">${this._formatAmount(
                this.data.user.balance
              )}</span></p>
            </div>
            <a class="dark-mode-toggler">
              <ion-icon name="${isDark ? "moon" : "sunny"}"></ion-icon>
            </a>
            <div class="notification-container">
              <div class="notification">
                <span class="notification__count">1</span>
              </div>
              <ion-icon name="notifications-outline"></ion-icon>
            </div>
            <a href="/login.html" class="logout u-flex u-flex-v-center u-gap-small">
              <ion-icon name="log-out"></ion-icon>
              <span>Log out</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  customerDashboardMarkUp() {
    return `
      <div class="customer-account">
        <div class="customer-account__left">
          <div class="account-info">
            <div>
              <p>Account Name</p>
              <p class="account-info__name">${this.data.user.fullName}</p>
            </div>
            <div>
              <p>Account Number</p>
              <p class="account-info__number">${
                this.data.user.accountNumber
              }</p>
            </div>
          </div>
          <div class="account-stats">
            <div>
              <p>Income</p>
              <p><ion-icon name="arrow-up"></ion-icon><span>₦</span><span class="total-income">${this._formatAmount(
                this.data.totalIncome
              )}</span></p>
            </div>
            <div>
              <p>Expense</p>
              <p><ion-icon name="arrow-down"></ion-icon><span>₦</span><span class="total-expense">${this._formatAmount(
                Math.abs(this.data.totalExpense)
              )}</span></p>
            </div>
          </div>
        </div>
        <div class="customer-account__right">
          <img src=${dasboardAtmCard} />
        </div>
      </div>
    `;
  }

  emptyTransactionMarkUp() {
    return `
      <div class="transaction__history container-dashboard container-dashboard--shadow">
        <div class="transaction__history__heading">
          <span>Transactions</span>
        </div>
        <div class="transaction__history__item empty">
          <img src=${emptyTransaction} alt="" />
          <span>Aww! There is nothing here!</span>
          <p>No transactions yet. Start using Banca Wallet and they’ll appear here.</p>
        </div>
      </div>
    `;
  }

  transactionListMarkUp(transaction) {
    return `
      <div class="transaction__history__item">
        <div class="u-flex u-gap-small u-flex-v-center">
          <figure class="user-picture">
            <img src="${userAvatar}" alt="user-picture" />
          </figure>
          <div class="transaction-details">
            <p>${transaction.name}</p>
            <p class="transaction-details__date">${new Date(
              transaction.date
            ).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}</p>
          </div>
        </div>
        <div>
          <p class="${
            transaction.type === "deposit" ? "credit" : "debit"
          }">₦<span>${
      transaction.type === "deposit"
        ? this._formatAmount(transaction.amount)
        : this._formatAmount(Math.abs(transaction.amount))
    }</span></p>
        </div>
      </div>
    `;
  }

  _setUpStoredDarkMode() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark-mode");
    }
  }

  _addHandlerDarkModeToggle() {
    document.addEventListener("click", (e) => {
      const toggleBtn = e.target.closest(".dark-mode-toggler");
      if (!toggleBtn) return;

      const isDark = document.documentElement.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      document
        .querySelectorAll(".dark-mode-toggler ion-icon")
        .forEach((icon) => {
          icon.setAttribute("name", isDark ? "moon" : "sunny");
        });
    });
  }
  _formatAmount(amount) {
    return Number(amount).toLocaleString(); // → 5,200
  }
}
