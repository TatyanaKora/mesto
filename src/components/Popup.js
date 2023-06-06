export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleOverleyClose = this._handleOverleyClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleOverleyClose(evt) {
    if (evt.target.classList.contains("popup__close") ||
      evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  }
  _handleEscClose(evt){
    if (evt.key === "Escape") this.close();
  };
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }
  setEventListeners() {
    this._popup.addEventListener("click", this._handleOverleyClose);
  }
  
}