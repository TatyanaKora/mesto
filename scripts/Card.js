//export class Card {
	//закладываю в конструктор всё, что должно быть в каждой карточке
  constructor(item, gridTemplate, openPhoto) {
    this._name = item.name;
    this._link = item.link;
    this._gridTemplate = gridTemplate;
    this._cardImagePopup = cardImagePopup; //картинка в полный размер
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.elements__image');
    this._cardTitle = this._cardElement.querySelector('.elements__card-title');
    this._deleteButton = this._cardElement.querySelector('.elements__delete-button');
    this._likeButton = this._cardElement.querySelector('.elements__like-button');
  }  
  };
  
}