//import { Card } from "./Card.js";
import { FormValidator } from './FormValidator.js';
import { сonfig } from './FormValidator.js';

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

//переменные
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
const templateConteinerPhotoGrid = document.querySelector('.photo-grid');
const cardElement = document.querySelector('.card');
const likeButtonCardList = document.querySelectorAll('.card__like');
const delButtonCardList = document.querySelectorAll('.card__delete');
const delCardElement = document.querySelector('.card__delete');
const imageCardElement = document.querySelector('.card__image');


const editPopupFormValidate = new FormValidator(сonfig, editPopupForm);
editPopupFormValidate.enableValidation();

const addPopupFormValidate = new FormValidator(сonfig, addPopupForm);
addPopupFormValidate.enableValidation();


//функции
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

//откроет поп-ап для загрузки новой карточки
function openPopupAddCard() {
  openPopup(popupAddCard);
}

//функции карточек (загрузка из массива, лайки, удаление, новая карточка, просмотр)
function createCard(link, name) {
  const cardElement = gridTemplate.querySelector('.card').cloneNode(true);
  const likeCardButton = cardElement.querySelector('.card__like');
  const cardPhoto = cardElement.querySelector('.card__image');
  cardPhoto.src = link;
  cardPhoto.setAttribute('alt', name);
  cardElement.querySelector('.card__name').textContent = name;
  cardElement.querySelector('.card__delete').addEventListener('click', function () {
    cardElement.remove();
  })
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__image').addEventListener('click', openPhoto);
  return cardElement;
}
//запускаем массив, выгружаем карточки на страницу
initialCards.forEach(function (item) {
  const card = createCard(item.link, item.name);
  templateConteinerPhotoGrid.append(card);
});

//загружает новую карточку 
function submitAddCardForm(event) {
  event.preventDefault();
  const newCard = createCard(linkInputAddPopup.value, mestoInputAddPopup.value);
  templateConteinerPhotoGrid.prepend(newCard);
  closePopup(popupAddCard);
  mestoInputAddPopup.value = '';
  linkInputAddPopup.value = '';
  saveButtonAddPopup.classList.add('popup__save_disable');
  event.target.reset();
};

//оставить
formAddCardPopup.addEventListener('submit', submitAddCardForm);


//в кард картинку в полный экран
function openPhoto(evt) {
  openPopup(photoPopup);
  elementPhotoPopup.src = evt.target.closest('.card__image').src;
  elementPhotoPopup.alt = evt.target.closest('.card').textContent;
  elementNamePhotoPopup.textContent = evt.target.closest('.card').textContent;
}

//обработчики событий
//прослушиватель на кнопку закрыть картинку
closePhotoPopupButton.addEventListener('click', function closePhotoPopup() {
  closePopup(photoPopup);
});
//оставить вешаем прослушиватель на кнопку + , чтобы открыть поп-ап "новое место"
addButtonProfile.addEventListener('click', () => {
  openPopup(popupAddCard)
});

//оставить закроем поп-ап "новое место" при нажатии на крестик
closeAddPopupButton.addEventListener('click', function closePopupAddCard() {
  closePopup(popupAddCard,);
});

//оставить закроем поп-апы кликом мимо окна (на оврелей)
popupList.forEach((item) => {
  item.addEventListener('click', closeOverleyPopup);
});

//оставить нажмём на кнопку "редактировать" и откроем поп-ап редактирование профиля 
openEditProfileButton.addEventListener('click', openPopupEditProfile);

//оставить нажмём на крестик и закроем поп-ап редактирования профиля
closeEditPopupButton.addEventListener('click', function closePopupEditProfile() {
  closePopup(popupEditProfile);
});