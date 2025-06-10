export default class View {
  data;

  render(data) {
    this.data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._addEventHandler?.();
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
  _addEventHandler() {}
  _clear() {
    this._parentElement.innerHTML = "";
  }
  clearForm(formElements) {
    formElements.forEach((formElement) => (formElement.value = ""));
  }
}
