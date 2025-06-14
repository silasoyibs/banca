import View from "../../view.js";
import sadEmoji from "../../../../img/SVG/sad-emoji.svg";
class LoanView extends View {
  _parentElement = document.querySelector(".dashboard-main");
  _generateMarkup() {
    return `
        ${this.headerMarkUp()}
        <main>
            <div class="loan-view">
              <div class="loan-view__content">
                <img src=${sadEmoji} alt="sad-emoji-face"/>
                <p>
                Loan applications will soon be available on your dashboard. For now,
                please apply via the <a href="/index.html">Home page</a>.
                </p>
              </div>
            </div>
        </main>
    `;
  }
}

export default new LoanView();
