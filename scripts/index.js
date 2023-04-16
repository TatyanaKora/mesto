//переменные

let editPopup = document.querySelector('.popup_type_edit');
let mestoPopup = document.querySelector('.popup_type_mesto');
let photoPopup = document.querySelector('.popup_type_photo');
let openButton = document.querySelector('.profile__edit');
let closeEditButton = document.querySelector('.popup__close_edit');
let closeAddButton = document.querySelector('.popup__close_add');
let closePhotoButton = document.querySelector('.popup__close_photo');
let formEdit = document.querySelector('.popup__edit');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameAuthor = document.querySelector('.profile__name');
let jobAuthor = document.querySelector('.profile__job-text');
let addButton = document.querySelector('.profile__add');
let formAdd = document.querySelector('.popup__add');
let mestoInput = document.querySelector('.popup__input_type_mesto');
let linkInput = document.querySelector('.popup__input_type_url');
const likeButtonList = document.querySelectorAll('.card__like');
const delButtonList = document.querySelectorAll('.card__delete');
const saveButton = document.querySelector('.popup__save_type_mesto');
const templateConteiner = document.querySelector('.photo-grid');
const elementPhoto = document.querySelector('.popup__photo-img');
const elementName = document.querySelector('.popup__photo-name');
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
  nameInput.value = nameAuthor.textContent;
  jobInput.value = jobAuthor.textContent;
}

//вешаем прослушиватель на кнопку, чтобы окно открывалось при нажатии
openButton.addEventListener('click', openEditPopup);

//прослушиватель на кнопку + закрываем окно редактирования профиля
closeEditButton.addEventListener('click', function closeEditPopup() {
  closePopup(editPopup);
});

//отправка заполненной формы в профиль
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameAuthor.textContent = nameInput.value;
  jobAuthor.textContent = jobInput.value;
  closePopup(editPopup);
}
formEdit.addEventListener('submit', handleFormSubmit);

//откроем окно для загрузки карточки
function openAddPopup() {
  openPopup(mestoPopup);
  //mestoInput.value = name;
  //linkInput.value = name;
}
//вешаем прослушиватель на кнопку, чтобы окно открывалось при нажатии
addButton.addEventListener('click', openAddPopup);

//закроем окно при нажатии на крестик
closeAddButton.addEventListener('click', function closeAddPopup() {
  closePopup(mestoPopup);
});

//карточки из массива - всё в одной функции
function runCard(link, name) {
  const gridTemplate = document.querySelector('#template-card').content;
  const cardElement = gridTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like');
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
  let card = runCard(item.link, item.name);
  templateConteiner.append(card);
});

//сабмит - новая карточка
function newCardSubmit(event) {
  event.preventDefault();
  const newCard = runCard(linkInput.value, mestoInput.value);
  templateConteiner.prepend(newCard);
  closePopup(mestoPopup);
}
formAdd.addEventListener('submit', newCardSubmit);

//открываем картинку в полный экран
function openPhoto(evt) {
  openPopup(photoPopup);
  elementPhoto.src = evt.target.closest('.card__image').src;
  elementPhoto.alt = evt.target.closest('.card').textContent;
  elementName.textContent = evt.target.closest('.card').textContent;
}

//прослушиватель на кнопку закрыть картинку
closePhotoButton.addEventListener('click', function closePhotoPopup() {
  closePopup(photoPopup);
});

