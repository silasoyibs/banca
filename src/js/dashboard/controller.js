import * as model from "./model.js";
import dashboardView from "./views/dashboard/dashboardView.js";
// import dashboardHeaderView from "./views/dashboardHeaderView.js";

async function controlDashboard() {
  try {
    // get userdata from database
    const currentUser = await model.getCurrentUserData();
    console.log(currentUser);
    // update dashboard headerview
    // dashboardView.render(currentUser);
  } catch (err) {
    console.log(err);
  }
}

controlDashboard();
