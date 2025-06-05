export default class View {
  data;
  transactionList;
  render(data) {
    this.data = data;
    this.transactionList = this.data.transactions;
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
