export class Card {
    constructor(data, templateSelector, openPhoto) {//в конструктор закладываем все данные по карточкам
        this._templateSelector = templateSelector;
        this._cardPhoto = data.link;//взять ссылку из массива
        this._cardName = data.name; //вхять имя из массива
        this._cardTemplate = document.querySelector(this._templateSelector);
        this._templateClone = this._cardTemplate.content.querySelector('.card').cloneNode(true);
        this._nameCardElement = this._templateClone.querySelector('.card__name');
        this._imageCardElement = this._templateClone.querySelector('.card__image');
        this._likeButton = this._templateClone.querySelector('.card__like');
        this._deleteButton = this._templateClone.querySelector('.card__delete');
		this._photoPopup = photoPopup;
	    this._elementNamePhotoPopup = this._photoPopup.querySelector('.popup__photo-img');
		this._elementPhotoPopup = this._photoPopup.querySelector('.popup__photo-name');
    }

    _likeCard() {
        this._likeButton.classList.toggle('card__like_active');
    }

    _deleteCard() {
        this._templateClone.remove();
        this._templateClone = null;
    }
	
	_openPhoto(src, title) {
		this._elementPhotoPopup.src = src;
		this._elementPhotoPopup.alt = title;
		this._elementNamePhotoPopup.textContent = title;
	}
		
    _setCardEventListener() {
        this._likeButton.addEventListener('click', () => {
            this._likeCard();
        })
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });
        this._imageCardElement.addEventListener('click', () => {
            _openPhoto(this._elementPhotoPopup.src, this._elementPhotoPopup.alt)
        });
    }

    generateCard() {
        this._nameCardElement.textContent = this._cardName;
        this._imageCardElement.src = this._cardPhoto;
        this._imageCardElement.alt = this._cardName;

        this._setCardEventListener();

        return this._templateClone;
    }
}