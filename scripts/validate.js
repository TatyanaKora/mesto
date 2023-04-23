//какие переменные вложены в функцию
const enableValidation = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__save',
	inactiveButtonClass: 'popup__save_disable',
	inputErrorClass: 'popup__input_error',
	errorClass: 'popup__input-error_active'
};
  //делала по тренажерам
//1. эта функция находит ошибку в инпуте и выводит сообщения об ошибке
const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
};
//2. функция, обратная 1
const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
};

//3. переключает функции 1 и 2 в зависимости от наличия ошибки
const checkInputValidity = (formElement, inputElement, { inputErrorClass, errorClass }) => {
	if (!inputElement.validity.valid) {
		showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
	} else {
		hideError(formElement, inputElement, inputErrorClass, errorClass);
	}
};

// 4. проверка на условия валидации 
const InvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
};


//собираем все инпуты в разметке в массив и связываем активность 
setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const submitButton = formElement.querySelector(submitButtonSelector);
	toggleButtonState(inputList, submitButton, inactiveButtonClass);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement, rest);
			toggleButtonState(inputList, submitButton, inactiveButtonClass);
		});
	});
}
// кнопке присваивается неактивное состояние
const disableSubmitButton = (submitButton, inactiveButtonClass) => {
	submitButton.classList.add(inactiveButtonClass);
	submitButton.setAttribute('disabled', true);
}

//кнопка становится активной
const activeSubmitButton = (submitButton, inactiveButtonClass) => {
	submitButton.classList.remove(inactiveButtonClass);
	submitButton.removeAttribute('disabled', true);
}

//переключает активность неактивность кнопки в зависимости от результатов валидации
const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
	if (InvalidInput(inputList)) {
		disableSubmitButton(submitButton, inactiveButtonClass);
	} else {
		activeSubmitButton(submitButton, inactiveButtonClass);
	}
};

const enableValidationList = ({ formSelector, ...rest }) => {
	const formList = Array.from(document.querySelectorAll('.popup__form'));

	formList.forEach((formElement) => {
		setEventListeners(formElement, rest);
	});
}
enableValidationList(enableValidation);