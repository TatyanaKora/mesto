export default class Card {
constructor(data, templateSelector, handleCardClick ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  };

  _getTemplate() {
   const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  };
  generateCard() {
   this._card = this._getTemplate();
   this._imageCardElement = this._card.querySelector('.card__image');
   this._likeButton = this._card.querySelector('.card__like');	
   this._deleteButton = this._card.querySelector('.card__delete');
   this._imageCardElement.src = this._link;
   this._imageCardElement.alt = this._name;
   this._card.querySelector('.card__name').textContent = this._name;
   this._setEventListeners();
   
   return this._card;
  }
  _deleteCard() {
    this._card.remove();
	 this._card = null
  }

  _likeCard() {
    this._likeButton.classList.toggle("card__like_active");
  };
  
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._card.querySelector('.card__image').addEventListener('click', () => {
      this.handleCardClick({
       name: this._name,
       link: this._link,
      });
    });
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
  };
}