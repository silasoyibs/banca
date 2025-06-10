import View from "../../view.js";
import dasboardAtmCard from "../../../../img/dashboard-img-card.png";
import userAvatar from "../../../../img/SVG/user.svg";
import bancaLogo from "../../../../img/Logo-2.png";
import { clearLoadingSpinner, loadingSpinner, toast } from "../../../common.js";

class FundAccountView extends View {
  _parentElement = document.querySelector(".dashboard-main");
  _addEventHandler() {
    this.addHandlerShowFundingAmount();
  }
  addHandlerShowFundingAmount() {
    const totalAmountText = document.querySelector(".total-amount");
    const amountInputField = document.querySelector(".amount input");
    totalAmountText.textContent = "";
    amountInputField.addEventListener("input", (e) => {
      e.preventDefault();
      totalAmountText.textContent = Number(e.target.value);
    });
  }
  addHandlerFundAccount(handler) {
    this._parentElement.addEventListener("click", async (e) => {
      const fundBtn = e.target.closest(".fund-btn");
      if (!fundBtn) return;
      e.preventDefault();
      console.log("fundAccount btn clicked");
      // disable button
      loadingSpinner(fundBtn);
      // get funding amount
      const fundAmount = document.querySelector(".amount input").value;
      if (!fundAmount) {
        toast.error("please fill an amount");
        clearLoadingSpinner(fundBtn, "Fund Now");
      }
      // get funding message from handler
      await handler(fundAmount);
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
     <!-- Fundind template -->
          <div class="customer-account">
                 <div class="customer-account__left">
                   <div class="account-info">
                     <div>
                       <p>Account Name</p>
                       <p class="account-info__name">${
                         this.data.user.fullName
                       }</p>
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
           <div class="fund"> 
            <div
              class="fund-account container-dashboard container-dashboard--shadow"
            >
              <figure>
                <img src="${bancaLogo}" alt="user-picture" />
              </figure>
              <span>Fund Your Banca Account</span>
              <div class="amount">
                <input type="number" placeholder="(₦) Amount" />
              </div>
              <div class="total u-flex u-flex-v-center u-flex-space-between">
                <span>Total</span>
                <p>₦<span class="total-amount">3</p>
              </div>
              <button class="fund-btn" id="submit">Fund Now</button>
            </div>
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
                              <p class="credit">₦<span>${
                                transaction.amount
                              }</span></p>
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
           </div>   
           </div> 
           </main>
           </div>

           `;
  }
}

export default new FundAccountView();
