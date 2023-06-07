import { Popup } from "./popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
	this._popupPhotoName = this._popup.querySelector(".popup__photo-name");
	this._popupPhotoImage = this._popup.querySelector(".popup__photo-img");
  }
  open(data) {
    this._popupPhotoName.textContent = data.name;
    this._popupPhotoImage.src = data.link;
    this._popupPhotoImage.alt = data.name;
    super.open();
  }
}