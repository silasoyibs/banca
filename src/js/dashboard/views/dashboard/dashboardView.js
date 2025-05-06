import View from "../../view.js";
import dasboardAtmCard from "../../../../img/dashboard-img-card.png";
import userAvatar from "../../../../img/SVG/user.svg";
import emptyTransaction from "../../../../img/SVG/empty-transaction.svg";

class DashboardView extends View {
  _transactions;
  _totalIncome;
  _totalExpense;
  _parentElement = document.querySelector(".dashboard-main");
  setTotalTransaction(transactions) {
    this._transactions = transactions;
    console.log(this._transactions);
  }
  setTotalIncome() {
    this._totalIncome = this._transactions
      .filter((amount) => amount > 0)
      .reduce((acc, amount) => acc + amount, 0);
  }
  setTotalExpense() {
    this._totalExpense = this._transactions
      .filter((amount) => amount < 0)
      .reduce((acc, amount) => acc + amount, 0);
  }
  sendMoney() {}
  showSendMoneyAmount() {}
  _generateMarkup() {
    return `
        <div class="header-nav">
          <div class="header-nav__left">
            <div class="customer-welcome">
              <p>
                Welcome Back<span class="customer-welcome__name"
                  >${this._user.data.userName}</span
                >
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
                <p>₦<span>${this._user.data.balance}</span></p>
              </div>
              <ion-icon name="sunny"></ion-icon>

              <div class="notification-container">
                <div class="notification">
                  <span class="notification__count">1</span>
                </div>
                <ion-icon name="notifications-outline"></ion-icon>
              </div>
              <a
                href="http://localhost:1234/login.html"
                class="logout u-flex u-flex-v-center u-gap-small"
              >
                <ion-icon name="log-out"></ion-icon>
                <span>Log out</span>
              </a>
            </div>
          </div>
        </div>
        <main class="main-view">
          <!-- main dashboad -->
          <div class="customer-account">
            <div class="customer-account__left">
              <div class="account-info">
                <div>
                  <p>Account Name</p>
                  <p class="account-info__name">${this._user.data.fullName}</p>
                </div>
                <div>
                  <p>Account Number</p>
                  <p class="account-info__number">${
                    this._user.data.accountNumber
                  }</p>
                </div>
              </div>

              <div class="account-stats">
                <div>
                  <p>Income</p>
                  <p><ion-icon name="arrow-up"></ion-icon><span>₦</span>${
                    this._totalIncome
                  }</p>
                </div>
                <div>
                  <p>Expense</p>
                  <p>
                    <ion-icon name="arrow-down"></ion-icon><span>₦</span>${Math.abs(
                      this._totalExpense
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div class="customer-account__right">
              <img src=${dasboardAtmCard} />
            </div>
          </div>
         <div class="transaction">
        
          ${
            this._transactions.length <= 1
              ? `
              <div 
           class="transaction__history container-dashboard container-dashboard--shadow"
         >
           <div class="transaction__history__heading">
             <span>Transactions</span>
           </div>

           <div class="transaction__history__item empty">
             <img src=${emptyTransaction} alt="" />
             <span>Aww! There is nothing here!</span>
             <p>
               No transactions yet. Start using Banca Wallet and they’ll
               appear here.
             </p>
           </div>
          </div>  
           
           `
              : `
            <div
              class="transaction__history container-dashboard container-dashboard--shadow"
            >
              <div class="transaction__history__heading">
                <span>Transactions</span>
                <a href="">View all</a>
              </div>

              <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src=${userAvatar}  alt="user-picture" />
                  </figure>
                  <div class="transaction-details">
                    <p>Idris Saidu</p>
                    <p class="transaction-details__date">Aug 8,2024-02:26</p>
                  </div>
                </div>
                <div>
                  <p class="credit">₦<span class="credit">700</span></p>
                </div>
              </div>

              <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src=${userAvatar}  alt="user-picture" />
                  </figure>
                  <div class="transaction-details">
                    <p>Idris Saidu</p>
                    <p class="transaction-details__date">Aug 8,2024-02:26</p>
                  </div>
                </div>
                <div>
                  <p class="debit">₦<span>700</span></p>
                </div>
              </div>

              <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src=${userAvatar}  alt="user-picture" />
                  </figure>
                  <div class="transaction-details">
                    <p>Idris Saidu</p>
                    <p class="transaction-details__date">Aug 8,2024-02:26</p>
                  </div>
                </div>
                <div>
                  <p class="credit">₦<span>700</span></p>
                </div>
              </div>
            </div>`
          }
            <div
              class="transaction__history__send-money container-dashboard container-dashboard--shadow"
            >
              <span>Send Money</span>
          
             
              <div class="pay">
                <label> Pay to </label>
                <input type="number" placeholder="Enter Banca Account Number" />
              </div>
              <div class="amount">
                <label> Amount(₦) </label>
                <input type="number" placeholder="Amount" />
              </div>
              <div class="total u-flex u-flex-v-center u-flex-space-between">
                <span>Total</span>
                <p>₦<span>3</span></p>
              </div>
              <button id="submit">Send Money</button>
            </div>
    
     
     `;
  }
}

export default new DashboardView();
