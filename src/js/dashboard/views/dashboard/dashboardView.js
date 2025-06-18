import View from "../../view.js";
import { toast, loadingSpinner, clearLoadingSpinner } from "../../../common.js";

class DashboardView extends View {
  _parentElement = document.querySelector(".dashboard-main");
  _addEventHandler() {
    this._addHandlerShowAmount();
  }
  addHandlerSendMoney(handler) {
    this._parentElement.addEventListener("click", async (e) => {
      const sendMoneyBtn = e.target.closest(".send-money-button");
      const accountNumberInput = document.querySelector(".send-account-input");
      const transferAmountInput = document.querySelector(".send-amount-input");
      if (!sendMoneyBtn) return;
      e.preventDefault();
      try {
        // disable button
        loadingSpinner(sendMoneyBtn);
        // get values of input field
        const recipientAccountNumber = Number(accountNumberInput.value);
        // set total amount to user amount input
        const amount = Number(transferAmountInput.value);
        if (!recipientAccountNumber || !amount)
          toast.error("please fill all fields");
        // get transfer status from model
        const transferStatus = await handler({
          recipientAccountNumber,
          amount,
        });
        if (transferStatus === "Transfer Successful!")
          toast.success(transferStatus);
      } catch (error) {
        toast.error(error.message || "Transaction Could Not be Completed");
      } finally {
        // reset total amount to default
        const totalAmount = document.querySelector(".send-total-amount");
        totalAmount.textContent = "";
        this.clearForm([accountNumberInput, transferAmountInput]);
        setTimeout(() => {
          clearLoadingSpinner(sendMoneyBtn, "Send Money");
        }, 6000);
        // hide toast
        toast.hide();
      }
    });
  }
  _addHandlerShowAmount() {
    const totalAmount = document.querySelector(".send-total-amount");
    const sendAmountField = document.querySelector(".send-amount-input");
    sendAmountField.addEventListener("input", (e) => {
      e.preventDefault();
      totalAmount.textContent = this._formatAmount(Number(e.target.value));
    });
  }
  _generateMarkup() {
    return `
          ${this.headerMarkUp()}
        <main class="main-view">
          <!-- main dashboad -->
         ${this.customerDashboardMarkUp()}
         <div class="transaction">
          ${
            this.data.transactions.length === 0
              ? this.emptyTransactionMarkUp()
              : `
            <div
              class="transaction__history container-dashboard container-dashboard--shadow"
            >
              <div class="transaction__history__heading">
                <span>Transactions</span>
                <a class="transaction-view" >View all</a>
              </div>
             ${this.data.transactions
               .slice(0, 3)
               .map((transaction) => this.transactionListMarkUp(transaction))
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
    document.querySelector(
      ".banca-user-balance"
    ).textContent = `${this._formatAmount(newBalance)}`;
  }
  updateTransaction(newTransaction, newTotalIncome, newTotalExpense) {
    // update dashbaord transaction statistics
    document.querySelector(".total-income").textContent =
      this._formatAmount(newTotalIncome);
    document.querySelector(".total-expense").textContent = this._formatAmount(
      Math.abs(newTotalExpense)
    );
    //  update transaction list
    const transactionContainer = document.querySelector(
      ".transaction__history"
    );
    // If no transactions, show empty markup
    if (this.data.transactions.length === 0) return;
    // clear transaction container
    transactionContainer.innerHTML = `
    <div class="transaction__history__heading">
                <span>Transactions</span>
                <a class="transaction-view" href="">View all</a>
       </div>
    `;
    // Generate Transaction Markup
    const newTransactionHtml = newTransaction
      .slice(0, 3)
      .map((transaction) => this.transactionListMarkUp(transaction))
      .join("");
    transactionContainer.insertAdjacentHTML("beforeend", newTransactionHtml);
  }
  addHandlerViewAllTransaction(handler) {
    document.addEventListener("click", (e) => {
      const viewAllTransactionLink = e.target.closest(".transaction-view");
      if (!viewAllTransactionLink) return; // Not the link you care about
      e.preventDefault();
      handler();
    });
  }
}

export default new DashboardView();
