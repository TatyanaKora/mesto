export default class Card {
   constructor(data, templateSelector, {checkLikeCard, checkdisLikeCard, deleteCard}, handleCardClick, userId) {
	this._templateSelector = templateSelector;
    this._link = data.link;
    this._name = data.name;
    this._owner = data.owner;
    this._id = data._id;
    this._likes = data.likes;
    this.userId = userId;
	this._ownerId = data.ownerId;
    this._handleCardClick = handleCardClick;
    this._checkLikeCard = checkLikeCard;
    this._checkdisLikeCard = checkdisLikeCard;
    this._deleteCard = deleteCard;
   
  }

  _getTemplate() {
      const cardElement = document.querySelector('#template-card').content.querySelector('.card').cloneNode(true);
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
    this._popupImgClose = this._card.querySelector('.popup__button-delete');
    this._likeCount = this._card.querySelector('.card__like-counter');
    if (this._ownerId !== this.userId) {
      this._deleteButton.classList.remove('card__delete_inactive');
    };
    this._likeCount.textContent = this._likes.length;
    this._setEventListeners();
    return this._card;
  }

  deleteCard() {
    this._card.remove();
	this._card = null;
  }

  _checkdateLikes(likes) {
    this._likeCount.textContent = this._likes.length;
  }

  _checLikeClick() {
    this._likeButton.classList.toggle('card__like_active');

    if (this._likeButtonn.classList.contains('card__like_active')) {
      this._checkLikeCard(this);
    } else {
      this._checkdisLikeCard(this);
    }
  }

  _setEventListeners() {
    if (this._ownerId === this._userId) {
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard(this)
      });
    }

    this._imageCardElement.addEventListener('click', () =>
      this._handleCardClick(this._link, this._name)
    );
    this._likeButton.addEventListener('click', () => this._checkdateLikes());
  }
}