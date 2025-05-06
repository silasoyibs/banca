import View from "../../view.js";
import dasboardAtmCard from "../../../../img/dashboard-img-card.png";
import userPicture from "../../../../img/silas.jpg";
import bancaLogo from "../../../../img/Logo-2.png";

class FundAccountView extends View {
  _parentElement = document.querySelector(".main-view");
  _fundElement = document.querySelector(".fund");
  _fundBtn = this._parentElement.querySelector(".fund-btn");
  _fundAmount;

  showFundingAmount() {
    const totalAmountText = this._fundElement.querySelector(".total-amount");
    const amountInputFied = this._fundElement.querySelector(".amount input");
    totalAmountText.textContent = "";
    amountInputFied.addEventListener("input", (e) => {
      e.preventDefault();
      this._fundAmount = Number(e.target.value);
      totalAmountText.textContent = this._fundAmount;
    });
  }
  fundAccount() {
    this._fundBtn.addEventListener("click", this.payWithPaystack.bind(this));
  }
  payWithPaystack() {
    console.log(this._user.data);
    const handler = PaystackPop.setup({
      key: "pk_test_86d236442aa4f6fd2b610b3d8838d7737184036f", // from Paystack dashboard
      email: this._user.data.email, // use the actual logged-in user
      amount: this._fundAmount * 100, // amount in kobo
      currency: "NGN",
      callback: function (response) {
        // verify the transaction here
        console.log("Payment complete! Reference: " + response.reference);
        // You can now call your backend to update wallet
      },
      onClose: function () {
        alert("Transaction was not completed");
      },
    });

    handler.openIframe();
  }
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
                  <p class="account-info__number">12345565555</p>
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
              <img src=${dasboardAtmCard} />
            </div>
          </div>
           <div class="fund"> 
            <div
              class="fund-account container-dashboard container-dashboard--shadow"
            >
              <figure>
                <img src=${bancaLogo} alt="user-picture" />
              </figure>
              <span>Fund Your Banca Account</span>
              <div class="amount">
                <input type="number" placeholder="(₦) Amount" />
              </div>
              <div class="total u-flex u-flex-v-center u-flex-space-between">
                <span>Total</span>
                <p>₦<span class="total-amount ">3</p>
              </div>
              <button class="fund-btn" id="submit">Fund Now</button>
            </div>
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
                    <img src=${userPicture} alt="user-picture" />
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
                    <img src=${userPicture}  alt="user-picture" />
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
                    <img src=${userPicture} alt="user-picture" />
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
    `;
  }
}

export default new FundAccountView();
