let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let formElement =  document.querySelector('.popup__edit');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let nameAuthor = document.querySelector('.profile__name');
let jobAuthor = document.querySelector('.profile__job-text');

function closepopup () {
  popup.classList.remove('active');
}

openButton.addEventListener('click', function () {
    popup.classList.add('active');
	nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
});

closeButton.addEventListener('click', function () {
    popup.classList.remove('active');
});


function handleFormSubmit (evt) {
  evt.preventDefault();
  nameAuthor.textContent = nameInput.value;
  jobAuthor.textContent = jobInput.value;
  closepopup ();
}

formElement.addEventListener('submit', handleFormSubmit); 