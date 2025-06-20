import * as model from "./model.js";
import dashboardView from "./views/dashboard/dashboardView.js";
import fundAccountView from "./views/fundAccount/fundAccountView.js";
import initRouter from "./router.js";

// protect access to dashboard
async function controlProtectRoute() {
  try {
    const user = await model.waitForUserAuth(); // ✅ Wait for Firebase

    const isAuthenticated = sessionStorage.getItem("authenticated");

    if (!isAuthenticated) {
      // First login in this tab — show loader briefly
      document.querySelector(".redirect-loader").style.display = "flex";
      document.querySelector(".container--dashboard").style.display = "none";

      await new Promise((res) => setTimeout(res, 600));
      sessionStorage.setItem("authenticated", "true");
    }

    // ✅ Always show dashboard now that we’re authenticated
    document.querySelector(".redirect-loader").style.display = "none";
    document.querySelector(".container--dashboard").style.display = "grid";
  } catch (err) {
    console.warn("🔒 Redirecting to login:", err.message);
    window.location.href = "/login.html";
  }
}
// control dashbaord data
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
// control real time listeners
function controlRealTimeListeners() {
  // Listen to RealTime Changes
  model.listenToBalance(controlUpdateBalance);
  model.listenToTransaction(controlUpdateTransaction);
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
// Handlers for user actions
async function controlSendMoney(transfer) {
  return await model.transfer(transfer);
}
async function controlFundAccount(fundAmount) {
  return await model.fundAccount(fundAmount);
}
async function controlSignOut() {
  document.addEventListener("click", async (e) => {
    const logOutBtn = e.target.closest(".logout");
    if (!logOutBtn) return;
    await model.signOutUser();
  });
}
// intialize all control functions
const init = async function () {
  // control protectroute
  await controlProtectRoute();
  // Init Router
  initRouter();
  // control dashboard
  controlDashboard();
  // Send Money to Another Banca User
  dashboardView.addHandlerSendMoney(controlSendMoney);
  // Fund Banca Account
  fundAccountView.addHandlerFundAccount(controlFundAccount);
  // control user signout
  controlSignOut();
};
init();
