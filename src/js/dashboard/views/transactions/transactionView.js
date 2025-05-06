import View from "../../view";
import userPicture from "../../../../img/silas.jpg";
class TransactionView extends View {
  _parentElement = document.querySelector(".main-view");
  _generateMarkup() {
    return ` <div class="transaction transaction--view"> 
            <div class="transaction__history container-dashboard">
              <div class="transaction__history__heading">
                <span>Transactions</span>
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
                    <img src=${userPicture} alt="user-picture" />
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
          </div> `;
  }
  addHandlerUpdateView() {
    const btn = document.querySelector();
  }
}

export default new TransactionView();
