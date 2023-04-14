//Массив для загрузки карточек
 
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
let popup = document.querySelector('.popup');
let editPopup = document.querySelector('.popup_type_edit');
let mestoPopup = document.querySelector('.popup_type_mesto');
let openButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let closeAddButton = document.querySelector('.popup__close_add');
let formEdit = document.querySelector('.popup__edit');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameAuthor = document.querySelector('.profile__name');
let jobAuthor = document.querySelector('.profile__job-text');
let addButton = document.querySelector('.profile__add');
let formAdd = document.querySelector('.popup__add');
let mestoInput = document.querySelector('.popup__input_type_mesto');
let linkInput = document.querySelector('.popup__input_type_url');
const likeButton = document.querySelectorAll('.card__like');
const delButton = document.querySelectorAll('.card__delete');
const saveButton = document.querySelector('.popup__save_type_mesto');
const templateConteiner = document.querySelector('.photo-grid');
let photoPopup = document.querySelector('.popup__photo');
const elementPhoto = document.querySelector('.popup__photo-img');
const elementName = document.querySelector('.popup__photo-name');


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
closeButton.addEventListener('click', function closeEditPopup() {
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
  mestoInput.value = name;
  linkInput.value = name;
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
        cardElement.querySelector('.card__delete').addEventListener('click', function() {
            cardElement.remove();
        })
    
         cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
    return cardElement;
    }
	//запускаем массив, выгружаем карточки на страницу
  initialCards.forEach(function (item) {
        let card = runCard(item.link, item.name);
        templateConteiner.prepend(card);
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
    const popupPhoto = document.querySelector('.card__image');
    popupPhoto.addEventListener('click', function openPhoto(evt) {
    elementPhoto.src = evt.target.closest('.popup__photo-img').src;
    elementPhoto.alt = evt.target.closest('.card__name').textContent;
    elementName.textContent = evt.target.closest('.card__name').textContent;
});
	


