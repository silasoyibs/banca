import View from "../view.js";

class DashboardView extends View {
  check() {
    console.log(this._data);
  }
  _parentElement = document.querySelector(".dashboard");
  _generateMarkup() {
    return `
         <div class="customer-account">
            <div class="customer-account__left">
              <div class="account-info">
                <div>
                  <p>Account Name</p>
                  <p class="account-info__name">Silas Oyibo</p>
                </div>
                <div>
                  <p>Account Number</p>
                  <p class="account-info__number">${this._data.accountNumber}</p>
                </div>
              </div>

              <div class="account-stats">
                <div>
                  <p>Income</p>
                  <p><ion-icon name="arrow-up"></ion-icon><span>₦</span>4334</p>
                </div>
                <div>
                  <p>Expense</p>
                  <p>
                    <ion-icon name="arrow-down"></ion-icon><span>₦</span>6334
                  </p>
                </div>
              </div>
            </div>
            <div class="customer-account__right">
              <img src="src/img/dashboard-img-card.png" />
            </div>
          </div>
          <div class="transaction">
            <div class="transaction__history container-dashboard-shadow">
              <div class="transaction__history__heading">
                <span>Transactions</span>
                <a href="">View all</a>
              </div>
              <!-- item 1 -->
              <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src="src/img/silas.jpg" alt="user-picture" />
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
              <!-- item 2 -->
              <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src="src/img/silas.jpg" alt="user-picture" />
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
              <!-- item 3 -->
              <div class="transaction__history__item">
                <div class="u-flex u-gap-small u-flex-v-center">
                  <figure class="user-picture">
                    <img src="src/img/silas.jpg" alt="user-picture" />
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
            </div>
            <div
              class="transaction__history__send-money container-dashboard-shadow"
            >
              <span>Send Money</span>
              <div class="u-flex u-flex-v-center u-gap-small">
                <figure class="user-picture user-picture--transaction">
                  <img src="src/img/silas.jpg" alt="user-picture" />
                </figure>
                <figure class="user-picture user-picture--transaction">
                  <img src="src/img/silas.jpg" alt="user-picture" />
                </figure>
                <figure class="user-picture user-picture--transaction">
                  <img src="src/img/silas.jpg" alt="user-picture" />
                </figure>
              </div>
              <div
                class="view-contacts u-flex u-flex-v-center u-flex-space-between"
              >
                <span>View All Contacts</span>
                <a href=""><ion-icon name="arrow-forward"></ion-icon></a>
              </div>
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
          </div>

    `;
  }
}

export default new DashboardView();
