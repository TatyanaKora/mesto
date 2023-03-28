let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let formElement =  document.querySelector('.popup__edit');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameAuthor = document.querySelector('.profile__name');
let jobAuthor = document.querySelector('.profile__job-text');


function closePopup () {
  popup.classList.remove('popup_opened');
}

function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = nameAuthor.textContent;
  jobInput.value = jobAuthor.textContent;
}

openButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);


function handleFormSubmit (evt) {
  evt.preventDefault();
  nameAuthor.textContent = nameInput.value;
  jobAuthor.textContent = jobInput.value;
  closePopup ();
}

formElement.addEventListener('submit', handleFormSubmit); 