import * as model from "./model.js";
import dashboardView from "./views/dashboardView.js";
import dasboardView from "./views/dashboardView.js";

const controlDashboard = async function () {
  //   update view
  //   dasboardView.render(model.getCurrentUserData());
  //   dashboardView.check();
  try {
    const test = await model.getCurrentUserData();
    console.log(test);
  } catch (err) {
    console.log(err);
  }
};

controlDashboard();
