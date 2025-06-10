import View from "../../view.js";
import dasboardAtmCard from "../../../../img/dashboard-img-card.png";
import userAvatar from "../../../../img/SVG/user.svg";
import emptyTransaction from "../../../../img/SVG/empty-transaction.svg";
import { toast, loadingSpinner, clearLoadingSpinner } from "../../../common.js";

class DashboardView extends View {
  _parentElement = document.querySelector(".dashboard-main");
  _addEventHandler() {
    this._addHandlerShowAmount();
  }
  addHandlerSendMoney(handler) {
    this._parentElement.addEventListener("click", async (e) => {
      const sendMoneyBtn = e.target.closest(".send-money-button");
      if (!sendMoneyBtn) return;
      e.preventDefault();
      // disable button
      sendMoneyBtn.disable = true;
      loadingSpinner(sendMoneyBtn);
      // get values of input field
      const accountNumberInput = document.querySelector(".send-account-input");
      const transferAmountInput = document.querySelector(".send-amount-input");
      const recipientAccountNumber = Number(accountNumberInput.value);
      // set total amount to user amount input
      const amount = Number(transferAmountInput.value);
      if (!recipientAccountNumber || !amount) {
        toast.error("please fill all fields");
        clearLoadingSpinner(sendMoneyBtn, "Send Money");
      }
      // get transfer status from model
      const transferStatus = await handler({ recipientAccountNumber, amount });
      if (transferStatus === "transfer successful!")
        toast.success(transferStatus);
      // clear form
      this.clearForm([accountNumberInput, transferAmountInput]);
      // reset total amount to default
      const totalAmount = document.querySelector(".send-total-amount");
      totalAmount.textContent = "";
      // reset spinner to default
      setTimeout(() => {
        clearLoadingSpinner(sendMoneyBtn, "Send Money");
      }, 6000);
      // hide toast
      toast.hide();
      if (transferStatus === "transfer failed") toast.error(transferStatus);
      setTimeout(() => {
        clearLoadingSpinner(sendMoneyBtn, "Send Money");
      }, 6000);
      // hide toast
      toast.hide();
    });
  }
  _addHandlerShowAmount() {
    const totalAmount = document.querySelector(".send-total-amount");
    const sendAmountField = document.querySelector(".send-amount-input");
    sendAmountField.addEventListener("input", (e) => {
      e.preventDefault();
      totalAmount.textContent = Number(e.target.value);
    });
  }
  _generateMarkup() {
    return `
        <div class="header-nav">
          <div class="header-nav__left">
            <div class="customer-welcome">
              <p>
                Welcome Back<span class="customer-welcome__name"
                  >${this.data.user.userName}</span
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
                <p>₦<span class="banca-user-balance">${
                  this.data.user.balance
                }</span></p>
              </div>
              <ion-icon name="sunny"></ion-icon>

              <div class="notification-container">
                <div class="notification">
                  <span class="notification__count">1</span>
                </div>
                <ion-icon name="notifications-outline"></ion-icon>
              </div>
              <a
                href="/login.html"
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
                  <p><ion-icon name="arrow-up"></ion-icon><span>₦</span><span class="total-income">${
                    this.data.totalIncome
                  }</span></p>
                </div>
                <div>
                  <p>Expense</p>
                  <p>
                    <ion-icon name="arrow-down"></ion-icon><span>₦</span><span class="total-expense">${Math.abs(
                      this.data.totalExpense
                    )}</span>
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
            this.data.transactions.length === 0
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
             ${this.data.transactions
               .slice(0, 3)
               .map((transaction) => {
                 if (transaction.type === "deposit") {
                   return `
                <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src=${userAvatar} alt="user-picture" />
                  </figure>
                  <div class="transaction-details">
                    <p>${transaction.senderName}
                    </p>
                    <p class="transaction-details__date">${new Date(
                      transaction.date
                    ).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}</p>
                  </div>
                </div>
                <div>
                  <p class="credit">₦<span>${transaction.amount}</span></p>
                </div>
              </div>
              `;
                 }
                 if (transaction.type === "withdrawal") {
                   return `
                 <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src=${userAvatar} alt="user-picture" />
                  </figure>
                  <div class="transaction-details">
                    <p>${transaction.recieverName}
                    </p>
                    <p class="transaction-details__date">${new Date(
                      transaction.date
                    ).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}</p>
                  </div>
                </div>
                <div>
                  <p class="debit">₦<span>${Math.abs(
                    Number(transaction.amount)
                  )}</span></p>
                </div>
              </div>
              `;
                 }
               })
               .join("")}
            </div>`
          }
            <div
              class="transaction__history__send-money container-dashboard container-dashboard--shadow"
            >
              <span>Send Money</span>
          
             
              <div class="pay">
                <label> Pay to </label>
                <input class="send-account-input" type="number" placeholder="Enter Banca Account Number" />
              </div>
              <div class="amount">
                <label> Amount(₦) </label>
                <input class="send-amount-input" type="number" placeholder="Amount" />
              </div>
              <div class="total u-flex u-flex-v-center u-flex-space-between">
                <span>Total</span>
                <p>₦<span class="send-total-amount"></span></p>
              </div>
              <button class="send-money-button" id="submit">Send Money</button>
            </div>
    
     
     `;
  }
  updateBalance(newBalance) {
    document.querySelector(".banca-user-balance").textContent = `${newBalance}`;
  }
  updateTransaction(newTransaction, newTotalIncome, newTotalExpense) {
    // update dashbaord transaction statistics
    document.querySelector(".total-income").textContent = newTotalIncome;
    document.querySelector(".total-expense").textContent =
      Math.abs(newTotalExpense);
    //  update transaction list
    const transactionContainer = document.querySelector(
      ".transaction__history"
    );
    // clear transaction container
    transactionContainer.innerHTML = `
    <div class="transaction__history__heading">
                <span>Transactions</span>
                <a href="">View all</a>
       </div>
    `;
    // Generate Transaction Markup
    const newTransactionHtml = newTransaction
      .slice(0, 3)
      .map((transaction) => {
        if (transaction.type === "deposit") {
          return `
                <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src=${userAvatar} alt="user-picture" />
                  </figure>
                  <div class="transaction-details">
                    <p>${transaction.senderName}
                    </p>
                    <p class="transaction-details__date">${new Date(
                      transaction.date
                    ).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}</p>
                  </div>
                </div>
                <div>
                  <p class="credit">₦<span>${transaction.amount}</span></p>
                </div>
              </div>
              `;
        }
        if (transaction.type === "withdrawal") {
          return `
                 <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src=${userAvatar} alt="user-picture" />
                  </figure>
                  <div class="transaction-details">
                    <p>${transaction.recieverName}
                    </p>
                    <p class="transaction-details__date">${new Date(
                      transaction.date
                    ).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}</p>
                  </div>
                </div>
                <div>
                  <p class="debit">₦<span>${Math.abs(
                    Number(transaction.amount)
                  )}</span></p>
                </div>
              </div>
              `;
        }
      })
      .join("");
    transactionContainer.insertAdjacentHTML("beforeend", newTransactionHtml);
  }
}

export default new DashboardView();
