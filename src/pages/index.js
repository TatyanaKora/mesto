import "./index.css";
import Api from "../components/api.js";
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupCardDelete from "../components/popupCardDelete.js";

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
const deletePopup = document.querySelector('.popup_type_card-delete');
const deletePopupForm = deletePopup.querySelector('.popup__form');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarPopupForm = avatarPopup.querySelector('.popup__form');

const openEditProfileButton = document.querySelector('.profile__edit');
const avatarButton = document.querySelector('.profile__avatar-edit');
const nameAuthorProfile = document.querySelector('.profile__name');
const jobAuthorProfile = document.querySelector('.profile__job-text');
const addButtonProfile = document.querySelector('.profile__add');

const templateSelector = '#template-card';
const templateConteinerPhotoGrid = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.card__template').content.querySelector('.card');
const cardElement = document.querySelector('.card');
const likeButtonCardList = document.querySelectorAll('.card__like');
const delCardElement = document.querySelector('.card__delete');
const imageCardElement = document.querySelector('.card__image');
const cardName = document.querySelector('.card__name');

//подключаю API+++
const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-68/",
  headers: {
    authorization: "e30f2210-af8c-475a-a1c3-a51d57fda811", //токен из пачки
	 "content-type": "application/json",
  }
});

api.getUserApiData().then((data) => {
  console.dir(data);
});

//*ВАЛИДАЦИЯ*++
const editPopupFormValidate = new FormValidator(сonfig, editPopupForm);
editPopupFormValidate.enableValidation();

const addPopupFormValidate = new FormValidator(сonfig, addPopupForm);
addPopupFormValidate.enableValidation();

const avatarPopupFormValidate = new FormValidator(сonfig, avatarPopupForm);
avatarPopupFormValidate.enableValidation();

let userID = null; 

function setUserApiInfo(api, userInfo) {
  api
    .getUserApiData()
    .then((data) => {
      const {name, about, avatar} = data;
      userInfo.setUserInfo(name, about, avatar);
    })
    .catch((error) => {
      console.error("Внимание! Обнаружена ошибка:", error);
    });
}

//экземпляр класса для профиля+++
const userInfo = new UserInfo('.profile__name', '.profile__job-text', '.profile__avatar');
setUserApiInfo(api, userInfo);

//экземпляр класса для секции++
const section = new Section(
  {
    items: [],
    renderer: (item) => {
      renderCard(item);
    },
  },
  templateConteinerPhotoGrid
);
//карточки без кнопки делете с сервера+++
api.getInitial().then((cards) => {
  cards.forEach((card) => {
    renderCard(card, section);
  });
});
//попап для удаления
const popupDeleteCard = new PopupCardDelete(deletePopup);
popupDeleteCard.setEventListeners();
//удалить карточку
const checkDeleteCards = (card) => {
  popupDeleteCard.setDeleteButton(() => {
    api
      .deleteApiCard(card._id)
      .then((res) => {
        card.deleteCard();
        console.log(res);
        popupDeleteCard.close();
      })
      .catch(() => {
        console.log("Не удалось удалить объект");
      });
  });
  popupDeleteCard.open();
};

// поставим лайк и дизлайк
function checkLikeCard(card) {
  api
    .likeApiCard(card._id)
    .then((data) => {
      card._checkdateLikes(data.likes);
    })
    .catch(console.error);
}

function checkdisLikeCard(card) {
  api
    .dislikeApiCard(card._id)
    .then((data) => {
      card._checkdateLikes(data.likes);
    })
    .catch(console.error);
}

const popupImageOpen = new PopupWithImage(photoPopup);
popupImageOpen.setEventListeners();

function renderCard(data, sectiont, position = "append") {
  const userId = userInfo.getUserId();

  const card = new Card(
  data, 
  templateConteinerPhotoGrid,
    {checkLikeCard, checkdisLikeCard, deleteCard: checkDeleteCards},
    (link, name) => {
      popupImageOpen.open({name, link});
    },
    userId
  );
//формируем новую карточку для загрузки
  const newCard = card.generateCard();
  section.addItem(newCard, position);
  section.renderItems();

}

//сабмит 
function submitCards(data) {
  api
    .addApiCard({ name: data.title, link: data.url })
    .then((res) => res.json())
    .then((body) => {
      console.log(body);

      renderCard(body, section, "prepend");
    });
}

const popupNewAddCard = new PopupWithForm(popupAddCard, submitCards);
popupNewAddCard.setEventListeners();

addButtonProfile.addEventListener("click", () => {
  popupNewAddCard.open();
});

// сабмит для профиля
function submitProfils(inputValues) {
  api
    .setUserApiData({ name: inputValues.name, about: inputValues.bio })
    .then((outcome) => {
      userInfo.setUserInfo(outcome);
    })
    .catch((error) => {
      console.error(error);
    });
}

const popupNewEditProfile = new PopupWithForm(popupEditProfile, submitProfils);
popupNewEditProfile.setEventListeners();

openEditProfileButton.addEventListener("click", () => {
  popupNewEditProfile.open();

  const userInfoData = userInfo.getUserInfo();
  nameInputEditPopup.value = userInfoData.name;
  jobInputEditPopup.value = userInfoData.about;
});

//аватар-профиль
const аvatarEdit = (data) => {
  console.log(data);

  const link = data.url;

  api
    .editUserApiAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res);
      фмatarPopup.close();
    })
    .catch((error) => {
      console.error(error);
    });
};

const avatarNewPopup = new PopupWithForm(avatarPopup, аvatarEdit);
avatarNewPopup.setEventListeners();

avatarButton.addEventListener("click", () => {
  avatarNewPopup.open();
});

