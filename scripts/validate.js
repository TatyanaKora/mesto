//переменная
const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//делала по образцу в тренажёру валидация нескольких полей и форм
//функция находит ошибки, включает подчеркивание инпута красным и выводит сообщения
const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);//прописала id в span
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
};

//функция, обратная первой
const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
};

//переключает первые две функции в зависимости от результатов валидации
const inputValidity = (formElement, inputElement, { inputErrorClass, errorClass }) => {
	if (!inputElement.validity.valid) { //если не соблюдается валидации, то включается
		showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
	} else {//иначе включается
		hideError(formElement, inputElement, inputErrorClass, errorClass);
	}
};
//проверяем валидацию на всех инпутах
const invalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	})
};
//неактивная кнопка
const disableSaveButton = (buttonElement, inactiveButtonClass) => {
	buttonElement.classList.add(inactiveButtonClass);
	buttonElement.setAttribute('disable', true);
}
//активная кнопка
const activeSaveButton = (buttonElement, inactiveButtonClass) => {
	buttonElement.classList.remove(inactiveButtonClass);
	buttonElement.removeAttribute('disable', true);
}
//переключает кнопки с активной на неактивную по результатам валидации
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
	if (invalidInput(inputList)) {
		disableSaveButton(buttonElement, inactiveButtonClass);
	} else {
		activeSaveButton(buttonElement, inactiveButtonClass);
	}
};
//связываем кнопку с результатами валидации
setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	const buttonElement = formElement.querySelector(submitButtonSelector);
	toggleButtonState(inputList, buttonElement, inactiveButtonClass);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			inputValidity(formElement, inputElement, rest);
			toggleButtonState(inputList, buttonElement, inactiveButtonClass);
		});
	});
}
//запускаем валидацию на все формы, которые есть в разметке
const enableValidationList = ({ formSelector, ...rest }) => {
	const formList = Array.from(document.querySelectorAll('.popup__form'));

	formList.forEach((formElement) => {
		setEventListeners(formElement, rest);
	});
}

enableValidationList(enableValidation);