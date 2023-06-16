import { Popup } from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup);
	this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
	this._popupClose = this._popup.querySelector('.popup__close');
	this._popupSave = this._popup.querySelector('.popup__save');
	this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
  };

  _getInput() {
	const dataValues = {};
    this._inputList.forEach((input) => {
	  dataValues[input.id] = input.value;
		});
		return dataValues;
  }
  
     close() {
	super.close();
    this._popupForm.reset();
  }
   
  async submitForm(event) {
	event.preventDefault();//отмена стандартной отправки  
	const buttonText = this._popupSave.textContent;
    try {
      this._popupSave.textContent = "Сохранение...";
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      await this._submitForm(this._getInput());
      this.close();
    } catch (error) {
      console.error(error)
    } finally {
      this._popupSave.textContent = buttonText;
    }
  }
  
  setEventListeners() {
    super.setEventListeners();
	this._popupForm.addEventListener("submit", this.submitForm.bind(this));
  }
}