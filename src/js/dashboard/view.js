export default class View {
  _user;
  render(user) {
    if (!user) return;
    this._user = user;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
}
