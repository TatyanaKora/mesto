import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popup, submitForm }) {
    super(popup);
	this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
	this._popupClose = this._popup.querySelector('.popup__close');
	this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
  };

  _getInput() {
	const dataValues = {};
    this._inputList.forEach((input) => {
	  dataValues[input.name] = input.value;
		});
		return dataValues;
  };
  
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInput());
	  this.close();
    });
  }

  close() {
	super.close();
    this._popupForm.reset();
  }
}