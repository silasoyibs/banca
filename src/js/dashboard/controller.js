import * as model from "./model.js";
import dashboardView from "./views/dashboard/dashboardView.js";
import transactionView from "./views/transactions/transactionView.js";
import fundAccountView from "./views/fundAccount/fundAccountView.js";

async function controlDashboard() {
  try {
    // render spinner
    dashboardView.renderSpinner();
    // get userdata from database
    await model.getCurrentUserData();
    // render dashboard data
    dashboardView.render(model.state);
    // realtime listener
    controlRealTimeListeners();
  } catch (err) {
    console.log(err);
  }
}

async function controlSendMoney(transfer) {
  transferStatus = await model.transfer(transfer);
  return transferStatus;
}
// control banca funding account
async function controlFundAccount(fundAmount) {
  await model.fundAccount(fundAmount);
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
function controlDashboardView() {
  const navLinks = document.querySelectorAll(".nav__link");
  let viewTarget;
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // remove all active link on click
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      // add active class to current clicked nav
      e.currentTarget.classList.add("active");
      // get view target
      viewTarget = e.currentTarget.dataset.view;
      // render dashboardview
      if (viewTarget === "dashboard-view") {
        dashboardView.render(model.state);
      }
      // render transaction view
      if (viewTarget === "transaction-view") {
        transactionView.render(model.state);
      }
      // render funding view
      if (viewTarget === "funding-view") {
        fundAccountView.render(model.state);
      }
    });
  });
}

function controlRealTimeListeners() {
  // Listen to RealTime Changes
  model.listenToBalance(controlUpdateBalance);
  model.listenToTransaction(controlUpdateTransaction);
}

const init = function () {
  controlDashboard();
  // Send Money to Another Banca User
  dashboardView.addHandlerSendMoney(controlSendMoney);
  // Fund Banca Account
  fundAccountView.addHandlerFundAccount(controlFundAccount);

  // control dashboard view
  document.addEventListener("DOMContentLoaded", function () {
    controlDashboardView();
  });
};
init();
