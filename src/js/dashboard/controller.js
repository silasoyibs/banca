import * as model from "./model.js";
import dashboardView from "./views/dashboard/dashboardView.js";
import transactionView from "./views/transactions/transactionView.js";
import fundAccountView from "./views/fundAccount/fundAccountView.js";
import loanView from "./views/loan/loanView.js";

async function controlDashboard() {
  try {
    // render spinner
    dashboardView.renderSpinner();
    //Let the browser paint the spinner before heavy async tasks
    await new Promise((resolve) => requestAnimationFrame(resolve));
    // get userdata from database
    await model.getCurrentUserData();
    // render dashboard data
    dashboardView.render(model.state);
    // realtime listener
    controlRealTimeListeners();
    // throw new Error("something went wrong");
  } catch (error) {
    console.log(error);
  }
}

async function controlSendMoney(transfer) {
  transferStatus = await model.transfer(transfer);
  return transferStatus;
}
// control banca funding account
async function controlFundAccount(fundAmount) {
  const fundingStatus = await model.fundAccount(fundAmount);
  return fundingStatus;
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
      // render loan view
      if (viewTarget === "loan-view") {
        loanView.render(model.state);
      }
    });
  });
}

function controlRealTimeListeners() {
  // Listen to RealTime Changes
  model.listenToBalance(controlUpdateBalance);
  model.listenToTransaction(controlUpdateTransaction);
}

function controlViewAllTransaction() {
  transactionView.render(model.state);
}

const init = function () {
  controlDashboard();
  // Send Money to Another Banca User
  dashboardView.addHandlerSendMoney(controlSendMoney);
  // Fund Banca Account
  fundAccountView.addHandlerFundAccount(controlFundAccount);
  // control view all transaction
  dashboardView.addHandlerViewAllTransaction(controlViewAllTransaction);

  // control dashboard view
  document.addEventListener("DOMContentLoaded", function () {
    controlDashboardView();
  });
};
init();
