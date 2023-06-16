import { Popup } from './popup.js';
export default class PopupCardDelete extends Popup {
    constructor(popup, handleFormSubmit) {
    super(popup);
	this._popupDeleteCardButton = popup.querySelector('.popup__button-delete');
	this._CardDel = null;
    this._identifier = null;
  }
   
  setDeleteButton(deleteAction) {
    this._handleDeleteCallback = deleteAction;
  }
  open(CardDel, identifier) {
    super.open();
    this._CardDel = CardDel;
    this._identifier = identifier;
  }

  close() {
    super.close();
    this._CardDel = null;
    this._identifier = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupDeleteCardButton.addEventListener('click', (evt) => {
      this._handleDeleteCallback(this)
    });
  }
}