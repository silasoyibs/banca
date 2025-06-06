import * as model from "./model.js";
import dashboardView from "./views/dashboard/dashboardView.js";
// import dashboardHeaderView from "./views/dashboardHeaderView.js";

async function controlDashboard() {
  try {
    // render spinner
    dashboardView.renderSpinner();
    // get userdata from database
    await model.getCurrentUserData();
    // render dashboard data
    dashboardView.render(model.state);
    // Listen to RealTime Changes
    model.listenToBalance(model.state.user.id, controlUpdateBalance);
    model.listenToTransaction(model.state.user.id, controlUpdateTransaction);
    // await model.sendMoney();
    // dashboardView.showSendMoneyAmount();
    // control funding
    // fundAccountView.setUser(currentUser);
    // fundAccountView.fundAccount();
  } catch (err) {
    console.log(err);
  }
}

async function controlSendMoney(transfer) {
  transferStatus = await model.transfer(transfer);
  return transferStatus;
}

function controlUpdateBalance(newBalance) {
  dashboardView.updateBalance(newBalance);
}

function controlUpdateTransaction(
  newTransaction,
  newTotalIncome,
  newTotalExpense
) {
  dashboardView.updateTransaction(
    newTransaction,
    newTotalIncome,
    newTotalExpense
  );
}
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
  controlDashboard();
  // Send Money to Another Banca User
  dashboardView.addHandlerSendMoney(controlSendMoney);
  // dashboardView.addHandlerShowAmount();
  // transactionView.addHandlerUpdateView(controlTransaction);
  // fundAccountView.showFundingAmount();
  // fundAccountView.fundAccount();
};
init();
