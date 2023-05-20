export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._formElement = formElement;
    this._formElementList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }
  //публичный метод 
  enableValidation = () => {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  //приватные методы 
  //функция находит ошибки, включает подчеркивание инпута красным и выводит сообщения
  _showError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //функция, обратная первой
  _hideError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };
  //переключает первые функции показать/скрыть ошибку в зависимости от результатов валидации
  _inputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  //проверяем валидацию на всех инпутах
  _invalidInput = () => {
    return this._formElementList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  //активная кнопка
  _activeSaveButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  };
  //неактивная кнопка
  _disableSaveButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  };
  _setEventListeners = () => {
    this._formElementList.forEach((inputElement) => {//ищем все импуты
      this._disableSaveButton(); //изначально кнопка неактивна
      inputElement.addEventListener("input", () => {
        this._inputValidity(inputElement); //span активная или нет
        if (this._invalidInput()) {
          this._disableSaveButton();
        } else {
          this._activeSaveButton();
        }
        this._formElement.addEventListener("reset", () => {
          this._disableSaveButton();
        });
      });
    });
  };
}
