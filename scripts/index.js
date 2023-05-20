import { Card } from "./Card.js";
import { FormValidator } from './FormValidator.js';

//данные для массива 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const сonfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//ПЕРЕМЕННЫЕ
const popupList = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const editPopupForm = popupEditProfile.querySelector('.popup__form');
const jobInputEditPopup = popupEditProfile.querySelector('.popup__input_type_job');
const nameInputEditPopup = popupEditProfile.querySelector('.popup__input_type_name');
const closeEditPopupButton = popupEditProfile.querySelector('.popup__close_edit');

const popupAddCard = document.querySelector('.popup_type_mesto');
const addPopupForm = popupAddCard.querySelector('.popup__form');
const closeAddPopupButton = document.querySelector('.popup__close_add');
const formAddCardPopup = document.querySelector('.popup__form_type_add');
const mestoInputAddPopup = document.querySelector('.popup__input_type_mesto');
const linkInputAddPopup = document.querySelector('.popup__input_type_url');
const saveButtonAddPopup = document.querySelector('.popup__save_type_mesto');

const photoPopup = document.querySelector('.popup_type_photo');
const closePhotoPopupButton = document.querySelector('.popup__close_photo');
const elementPhotoPopup = document.querySelector('.popup__photo-img');
const elementNamePhotoPopup = document.querySelector('.popup__photo-name');

const openEditProfileButton = document.querySelector('.profile__edit');
const nameAuthorProfile = document.querySelector('.profile__name');
const jobAuthorProfile = document.querySelector('.profile__job-text');
const addButtonProfile = document.querySelector('.profile__add');

const gridTemplate = document.querySelector('#template-card').content;
const templateSelector = '#template-card';
const templateConteinerPhotoGrid = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card__template').content.querySelector('.card');
const cardElement = document.querySelector('.card');
const likeButtonCardList = document.querySelectorAll('.card__like');
const delButtonCardList = document.querySelectorAll('.card__delete');
const delCardElement = document.querySelector('.card__delete');
const imageCardElement = document.querySelector('.card__image');
const cardName = document.querySelector('.card__name');

//*ВАЛИДАЦИЯ*
const editPopupFormValidate = new FormValidator(сonfig, editPopupForm);
editPopupFormValidate.enableValidation();

const addPopupFormValidate = new FormValidator(сonfig, addPopupForm);
addPopupFormValidate.enableValidation();


//*КАРТОЧКИ* 
export const openPhoto = (src, title) => {
  elementPhotoPopup.src = src;
  elementNamePhotoPopup.textContent = title;
  elementPhotoPopup.alt = title;
  openPopup(photoPopup);
};

//откроет поп-ап для загрузки новой карточки 
function openPopupAddCard() {
  openPopup(popupAddCard);
}

//обработчик формы, сохраняет данные в карточку 
function submitAddProfileForm(event) {
  event.preventDefault();
  const form = event.target;
  const card = { name: mestoInputAddPopup.value, link: linkInputAddPopup.value };
  prependCard(card);
  closePopup(popupAddCard);
  form.reset();
};
formAddCardPopup.addEventListener('submit', submitAddProfileForm);

//загружает новые карточки из модуля Card 
const createCard = (name, link) => {
  const formCard = new Card({ name, link }, templateSelector);
  const photoFormCard = formCard.generateCard();
  return photoFormCard;
};
//добавляет карточку в начало темплейта 
const appendCard = ({ name, link }) => {
  const photoCard = createCard(name, link);
  templateConteinerPhotoGrid.append(photoCard);
};

//добавляет карточку в конец темплейта 
const prependCard = ({ name, link }) => {
  const photoCard = createCard(name, link);
  templateConteinerPhotoGrid.prepend(photoCard);
};
//перебираем массив 
initialCards.forEach(appendCard);

//ФУНКЦИИ 
//функция отркытия поп-апов 
function openPopup(namePopup) {
  namePopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup); //если нажать на esc, окно закроется 
}

//функция закрытия поп-ап 
function closePopup(namePopup) {
  namePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup);
}

//открывает поп-ап для редактирования профиля 
function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInputEditPopup.value = nameAuthorProfile.textContent;
  jobInputEditPopup.value = jobAuthorProfile.textContent;
}

//закрывает поп-апы кликом на темный фон (оверлей) 
function closeOverleyPopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};
//закрывает поп-апы нажатием клавиши esc,  
function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
};
//отправляет данные из заполненной формы в профиль 
function submitEditProfileForm(evt) {
  evt.preventDefault();
  nameAuthorProfile.textContent = nameInputEditPopup.value;
  jobAuthorProfile.textContent = jobInputEditPopup.value;
  closePopup(popupEditProfile);
}
editPopupForm.addEventListener('submit', submitEditProfileForm);


//ОБРАБОТЧИКИ СОБЫТИЙ 
//прослушиватель на кнопку закрыть картинку 
closePhotoPopupButton.addEventListener('click', function closePhotoPopup() {
  closePopup(photoPopup);
});
//вешаем прослушиватель на кнопку + , чтобы открыть поп-ап "новое место" 
addButtonProfile.addEventListener('click', () => {
  openPopup(popupAddCard)
});



//закроем поп-ап "новое место" при нажатии на крестик 
closeAddPopupButton.addEventListener('click', function closePopupAddCard() {
  closePopup(popupAddCard,);
});

//закроем поп-апы кликом мимо окна (на оврелей) 
popupList.forEach((item) => {
  item.addEventListener('click', closeOverleyPopup);
});

//нажмём на кнопку "редактировать" и откроем поп-ап редактирование профиля  
openEditProfileButton.addEventListener('click', openPopupEditProfile);

// нажмём на крестик и закроем поп-ап редактирования профиля 
closeEditPopupButton.addEventListener('click', function closePopupEditProfile() {
  closePopup(popupEditProfile);
}); 