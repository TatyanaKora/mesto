import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._elementPhotoPopup = this._popup.querySelector(".popup__photo-img");
    this._elementNamePhotoPopup = this._popup.querySelector(".popup__photo-name");
  }

  open = (item) => {
    this._elementPhotoPopup.src = item.link;
    this._elementNamePhotoPopup.textContent = item.name;
    this._elementPhotoPopup.alt = item.name;
    super.open();
  };
}
