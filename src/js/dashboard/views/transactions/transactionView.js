import View from "../../view";
import emptyTransaction from "../../../../img/SVG/empty-transaction.svg";

class TransactionView extends View {
  _parentElement = document.querySelector(".dashboard-main");
  _generateMarkup() {
    return `
        ${this.headerMarkUp()}
        <main class="main-view">
              <!-- transactionview -->
          <div class="transaction transaction--view">
            <div class="transaction__history container-dashboard">
              <div class="transaction__history__heading">
                <span>Transactions</span>
              </div>
              ${
                this.data.transactions.length === 0
                  ? `<div class="transaction__history__item empty">
                           <img src=${emptyTransaction} alt="" />
                           <span>Aww! There is nothing here!</span>
                           <p>
                             No transactions yet. Start using Banca Wallet and they’ll
                             appear here.
                           </p>
                         </div>`
                  : this.data.transactions
                      .map((transaction) =>
                        this.transactionListMarkUp(transaction)
                      )
                      .join("")
              }
          </div>  
         </main>
       </div>
          `;
  }
}

export default new TransactionView();
