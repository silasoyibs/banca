import View from "../../view.js";
import dasboardAtmCard from "../../../../img/dashboard-img-card.png";
import emptyTransaction from "../../../../img/SVG/empty-transaction.svg";
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
      totalAmountText.textContent = this._formatAmount(Number(e.target.value));
    });
  }

  addHandlerFundAccount(handler) {
    this._parentElement.addEventListener("click", async (e) => {
      const fundBtn = e.target.closest(".fund-btn");
      if (!fundBtn) return;
      e.preventDefault();
      // disable button
      loadingSpinner(fundBtn);
      // get funding amount
      const fundAmountInput = document.querySelector(".amount input");
      const fundAmount = Number(fundAmountInput.value);
      if (!fundAmount || fundAmount <= 0) {
        toast.error("please enter valid");
        clearLoadingSpinner(fundBtn, "Fund Now");
        return;
      }
      // get funding message from handler
      try {
        const fundingStatus = await handler(fundAmount);
        if (fundingStatus.toLowerCase().includes("successful")) {
          toast.success(fundingStatus);
        }
      } catch (error) {
        toast.error(error?.message || "funding failed");
      } finally {
        this.clearForm([fundAmountInput]);
        const totalAmount = document.querySelector(".total-amount");
        totalAmount.textContent = "";
        // Always reset spinner after 6 seconds
        setTimeout(() => {
          clearLoadingSpinner(fundBtn, "Fund Now");
          toast.hide(); // optionally hide toast, but maybe better to leave it visible longer
        }, 6000);
      }
    });
  }

  _generateMarkup() {
    return `
            ${this.headerMarkUp()}
            <main class="main-view">
              <!-- main dashboard -->
     <!-- Funding template -->
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
                            <a class="transaction-view">View all</a>
                          </div>
                         ${this.data.transactions
                           .slice(0, 3)
                           .map((transaction) =>
                             this.transactionListMarkUp(transaction)
                           )
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
