import View from "../../view";
import userAvatar from "../../../../img/SVG/user.svg";
class TransactionView extends View {
  _parentElement = document.querySelector(".dashboard-main");
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
              <!-- transactionview -->
          <div class="transaction transaction--view">
            <div class="transaction__history container-dashboard">
              <div class="transaction__history__heading">
                <span>Transactions</span>
              </div>
              ${this.data.transactions
                .map((transaction) => {
                  if (transaction.type === "deposit") {
                    return `
               <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src="${userAvatar}" alt="user-picture" />
                  </figure>
                  <div class="transaction-details">
                    <p>${transaction.senderName}</p>
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
                    <img src="${userAvatar}" alt="user-picture" />
                  </figure>
                  <div class="transaction-details">
                    <p>${transaction.recieverName}</p>
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
          </div>  
         </main>
       </div>
          `;
  }
  addHandlerUpdateView() {
    const btn = document.querySelector();
  }
}

export default new TransactionView();
