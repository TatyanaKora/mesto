import "./pages/index.css";

import Card from "./components/Card.js";
import FormValidator from './components/FormValidator.js';
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

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

const templateSelector = '#template-card';
const templateConteinerPhotoGrid = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card__template').content.querySelector('.card');
const cardElement = document.querySelector('.card');
const likeButtonCardList = document.querySelectorAll('.card__like');
const delButtonCardList = document.querySelectorAll('.card__delete');
const delCardElement = document.querySelector('.card__delete');
const imageCardElement = document.querySelector('.card__image');
const cardName = document.querySelector('.card__name');

//*ВАЛИДАЦИЯ*+
const editPopupFormValidate = new FormValidator(сonfig, editPopupForm);
editPopupFormValidate.enableValidation();

const addPopupFormValidate = new FormValidator(сonfig, addPopupForm);
addPopupFormValidate.enableValidation();

//откроем попап с картинкой+
const openImagePopup = new PopupWithImage(photoPopup);
openImagePopup.setEventListeners();

//стартовые карточки+
const section = new Section({
    items: initialCards,
    renderer: (item) => {
      renderCard(item);
    },
  },
  templateConteinerPhotoGrid);
section.renderItems();

function renderCard({ name, link }, position = "append") {
  const card = new Card({ name, link }, "#template-card", (name, link) => {
    openImagePopup.open(name, link);
  });
  const cardElement = card.generateCard();
  section.addItem(cardElement, position);
}

//поп-ап карточки
function submitAddForm(dataValues) {
  renderCard(dataValues, 'prepend');
}
const popupNewAddCard = new PopupWithForm({ popup: popupAddCard, submitForm: submitAddForm });
popupNewAddCard.setEventListeners();
//cлушатель + 
addButtonProfile.addEventListener("click", () => {
  popupNewAddCard.open();
});

//данные профиля
const userInfoProfile = new UserInfo(".profile__name", ".profile__job-text");
//сохраняет данные+
function submitProfileForm(dataValues) {
  userInfoProfile.setUserInfo(dataValues.profilename, dataValues.profilejob);
}
//поп-ап профиля+
const popupNewEditProfile = new PopupWithForm ({ popup: popupEditProfile, submitForm: submitProfileForm });
popupNewEditProfile.setEventListeners();

//слушатель+
openEditProfileButton.addEventListener("click", () => {
  popupNewEditProfile.open();
});