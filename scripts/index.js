//переменные

const editPopup = document.querySelector('.popup_type_edit');
const mestoPopup = document.querySelector('.popup_type_mesto');
const photoPopup = document.querySelector('.popup_type_photo');
const openEditProfileButton = document.querySelector('.profile__edit');
const closeEditPopupButton = document.querySelector('.popup__close_edit');
const closeAddPopupButton = document.querySelector('.popup__close_add');
const closePhotoPopupButton = document.querySelector('.popup__close_photo');
const formEditPopup = document.querySelector('.popup__edit');
const nameInputEditPopup = document.querySelector('.popup__input_type_name');
const jobInputEditPopup = document.querySelector('.popup__input_type_job');
const nameAuthorProfile = document.querySelector('.profile__name');
const jobAuthorProfile = document.querySelector('.profile__job-text');
const addButtonProfile = document.querySelector('.profile__add');
const formAddMestoPopup = document.querySelector('.popup__add');
const mestoInputMestoPopup = document.querySelector('.popup__input_type_mesto');
const linkInputMestoPopup = document.querySelector('.popup__input_type_url');
const likeButtonCardList = document.querySelectorAll('.card__like');
const delButtonCardList = document.querySelectorAll('.card__delete');
const saveButtonMestoPopup = document.querySelector('.popup__save_type_mesto');
const templateConteinerPhotoGrid = document.querySelector('.photo-grid');
const elementPhotoPopup = document.querySelector('.popup__photo-img');
const elementNamePhotoPopup = document.querySelector('.popup__photo-name');
const cardElement = document.querySelector('.card');
const delCardElement = document.querySelector('.card__delete');
const imageCardElement = document.querySelector('.card__image');

//функция отркытия поп-ап
function openPopup(namePopup) {
  namePopup.classList.add('popup_opened');
}

//функция закрытия поп-ап
function closePopup(namePopup) {
  namePopup.classList.remove('popup_opened');
}

//Открываем поп-ап для редактирования профиля
function openEditPopup() {
  openPopup(editPopup);
  nameInputEditPopup.value = nameAuthorProfile.textContent;
  jobInputEditPopup.value = jobAuthorProfile.textContent;
}

//вешаем прослушиватель на кнопку, чтобы окно открывалось при нажатии
openEditProfileButton.addEventListener('click', openEditPopup);

//прослушиватель на кнопку + закрываем окно редактирования профиля
closeEditPopupButton.addEventListener('click', function closeEditPopup() {
  closePopup(editPopup);
});

//отправка заполненной формы в профиль
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameAuthorProfile.textContent = nameInputEditPopup.value;
  jobAuthorProfile.textContent = jobInputEditPopup.value;
  closePopup(editPopup);
}
formEditPopup.addEventListener('submit', handleFormSubmit);

//откроем окно для загрузки карточки
function openAddPopup() {
  openPopup(mestoPopup);
}
//вешаем прослушиватель на кнопку, чтобы окно открывалось при нажатии
addButtonProfile.addEventListener('click', openAddPopup);

//закроем окно при нажатии на крестик
closeAddPopupButton.addEventListener('click', function closeAddPopup() {
  closePopup(mestoPopup);
});

//карточки из массива - всё в одной функции
function runCard(link, name) {
  const gridTemplate = document.querySelector('#template-card').content;
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
  const card = runCard(item.link, item.name);
  templateConteinerPhotoGrid.append(card);
});

//сабмит - новая карточка
function newCardSubmit(event) {
  event.preventDefault();
  const newCard = runCard(linkInput.value, mestoInput.value);
  templateConteinerPhotoGrid.prepend(newCard);
  closePopup(mestoPopup);
}
formAddMestoPopup.addEventListener('submit', newCardSubmit);

//открываем картинку в полный экран
function openPhoto(evt) {
  openPopup(photoPopup);
  elementPhotoPopup.src = evt.target.closest('.card__image').src;
  elementPhotoPopup.alt = evt.target.closest('.card').textContent;
  elementNamePhotoPopup.textContent = evt.target.closest('.card').textContent;
}

//прослушиватель на кнопку закрыть картинку
closePhotoPopupButton.addEventListener('click', function closePhotoPopup() {
  closePopup(photoPopup);
});

