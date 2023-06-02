import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
//import UserInfo from './UserInfo.js'


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

const popup = document.querySelector('.popup');
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
const photoPopupConteiner = document.querySelector('.popup__container_type_photo');
const closePhotoPopupButton = document.querySelector('.popup__close_photo');
const elementPhotoPopup = document.querySelector('.popup__photo-img');
const elementNamePhotoPopup = document.querySelector('.popup__photo-name');

const openEditProfileButton = document.querySelector('.profile__edit');
const nameAuthorProfile = document.querySelector('.profile__name');
const jobAuthorProfile = document.querySelector('.profile__job-text');
const addButtonProfile = document.querySelector('.profile__add');

//const gridTemplate = document.querySelector('#template-card').content;
const templateSelector = '#template-card';
const templateConteinerPhotoGrid = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card__template').content.querySelector('.card');
const cardElement = document.querySelector('.card');
const likeButtonCardList = document.querySelectorAll('.card__like');
const delButtonCardList = document.querySelectorAll('.card__delete');
const delCardElement = document.querySelector('.card__delete');
const imageCardElement = document.querySelector('.card__image');
const cardName = document.querySelector('.card__name');

const editPopupFormValidate = new FormValidator(сonfig, editPopupForm);
editPopupFormValidate.enableValidation();

const addPopupFormValidate = new FormValidator(сonfig, addPopupForm);
addPopupFormValidate.enableValidation();

//поп-ап для загрузки фото
 const popupNewAdd = new PopupWithForm(popupAddCard, (evt) => {
    evt.preventDefault();
    section.addItem(section.render(popupNewAdd.getInputValues()));
    popupNewAdd.close();
 })

 popupNewAdd.setEventListeners()
 //поп-ап для загрузки фото 
 
 //поп-ап картинка в полный размер
 const photoNewPopup = new PopupWithImage(photoPopup);

//экземпляр класса class

function newCard(item) {
  const card = new Card(data, templateSelector, photoNewPopup.open);
  return card.generateCard();
}
//экземпляр класса Section
const section = new Section({
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, templateConteinerPhotoGrid, photoNewPopup.open);
      const cardElement = newCard.createCard();
      return cardElement;
    }
  },
  templateConteinerPhotoGrid
);
section.render();


