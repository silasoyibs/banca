import View from "../view";
class DashboardHeaderView extends View {
  _parentElement = document.querySelector(".header-nav");
  _generateMarkup() {
    return `
        
    `;
  }
}

export default new DashboardHeaderView();
