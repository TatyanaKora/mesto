class Section {
    constructor({items, renderer}, templateConteinerPhotoGrid){
        this._items = items;
        this.renderer = renderer;
        this._templateConteinerPhotoGrid = templateConteinerPhotoGrid;
    }

    render() {
		 this._items.forEach((item) => {
            this.addItem(this.renderer(item))
        })
    }
    addItem(element) {
        this.templateConteinerPhotoGrid.prepend(element)
    }
}

export default Section;