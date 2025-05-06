import * as model from "./model.js";
import dashboardView from "./views/dashboard/dashboardView.js";
// import dashboardHeaderView from "./views/dashboardHeaderView.js";

async function controlDashboard() {
  try {
    // render spinner
    dashboardView.renderSpinner();
    // get userdata from database
    const currentUser = await model.getCurrentUserData();
    // render dashboard data

    // renderDashboardView(currentUser);
    dashboardView.setUser(currentUser);
    dashboardView.setTotalTransaction(model.state.transactionsAmount);
    dashboardView.setTotalIncome();
    dashboardView.setTotalExpense();
    dashboardView.render();
    // control funding
    fundAccountView.setUser(currentUser);
    fundAccountView.fundAccount();
  } catch (err) {
    console.log(err);
    console.log("not working");
  }
}

controlDashboard();

// function controlDashboardView() {
//   const navLinks = document.querySelectorAll(".nav__link");
//   let viewTarget;
//   navLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//       // remove all active link on click
//       navLinks.forEach((link) => {
//         link.classList.remove("active");
//       });
//       // add active class to current clicked nav
//       e.target.classList.add("active");
//       // get view target
//       viewTarget = e.target.dataset.view;
//       // render dashboardview
//       if (viewTarget === "dashboard-view") dashboardView.render();
//       // render transaction view
//       if (viewTarget === "transaction-view") transactionView.render();
//       // render funding view
//       if (viewTarget === "funding-view") fundAccountView.render();
//     });
//   });
// }

// controlDashboardView();
// const controlTransaction = function () {
//   controlTransaction.update();
// };

const init = function () {
  // transactionView.addHandlerUpdateView(controlTransaction);
  // fundAccountView.showFundingAmount();
  // fundAccountView.fundAccount();
};
init();
