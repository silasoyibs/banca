import dashboardView from "./views/dashboard/dashboardView.js";
import transactionView from "./views/transactions/transactionView.js";
import fundAccountView from "./views/fundAccount/fundAccountView.js";
import loanView from "./views/loan/loanView.js";
import * as model from "./model.js";

// Route-to-view mapping
const routes = {
  dashboard: () => dashboardView.render(model.state),
  transaction: () => transactionView.render(model.state),
  funding: () => fundAccountView.render(model.state),
  loan: () => loanView.render(model.state),
};

// Render view based on hash
function router() {
  const view = window.location.hash.slice(1) || "dashboard";
  const render = routes[view];
  if (render) {
    render();
    updateActiveNav(view);
  } else {
    console.warn(`No route found for: ${view}`);
  }
}

// Highlight active nav link
function updateActiveNav(activeView) {
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === activeView);
  });
}

// Enable routing system
export default function initRouter() {
  window.addEventListener("hashchange", router);
  window.addEventListener("load", () => {
    window.location.hash = "dashbaord";
    router();
  });
  // Make nav links set hash
  document.addEventListener("click", (e) => {
    const link = e.target.closest(".nav__link");
    if (!link) return;
    e.preventDefault();
    const view = link.dataset.view;
    if (view) {
      window.location.hash = view;
    }
  });
}
