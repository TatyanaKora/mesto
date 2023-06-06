export default class Section {
  constructor({ items, renderer }, templateConteinerPhotoGrid) {
   this._renderItems = items;
    this._renderer = renderer;
    this._cardContainer = templateConteinerPhotoGrid;
  }

  renderItems() {
    this._renderItems.forEach(this._renderer)
  }
//загружает с двумя позициями на выбор
  addItem(element, position = "append") {
    if (position === "prepend") {
      this._cardContainer.prepend(element);
    } else {
      this._cardContainer.append(element);
    }
  }
 }