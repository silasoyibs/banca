export default class View {
  constructor() {}
  _user;
  render() {
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderSpinner() {
    const markup = `
     <div class="spinner-container">
        <div class="page-spinner"></div> 
     </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  setUser(user) {
    if (!user) return;
    this._user = user;
  }
  // update() {
  //   const markup = this._generateMarkup();
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }
  _clear() {
    this._parentElement.innerHTML = "";
  }
}
