import { Popup } from "./popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }
  open(data) {
	  //убрала в index файле повторения
    this._popup.querySelector(".popup__photo-name").textContent = data.name;
    const image = this._popup.querySelector(".popup__photo-img");
    image.src = data.link;
    image.alt = data.name;
    super.open();
  }
}