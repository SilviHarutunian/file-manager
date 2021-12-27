import { makeAutoObservable, observable } from "mobx";

import { IElementType } from "../interfaces/interface";

class AddElements {
  constructor() {
    makeAutoObservable(this, {
      folderPopUp: observable,
      filePopUp: observable,
      trashElements: observable,
      allElements: observable,
    });
  }

  folderPopUp = false;
  filePopUp = false;
  trashElements: Array<IElementType> = [];
  allElements: Array<IElementType> = [];

  setAllElementsData(data: IElementType[]) {
    this.allElements = [...data];
  }

  setTrashElementsData(data: IElementType[]) {
    this.trashElements = [...data];
  }

  showFolderPopUp() {
    this.folderPopUp = !this.folderPopUp;
  }

  showFilePopUp() {
    this.filePopUp = !this.filePopUp;
  }

  addElement(element: IElementType) {
    this.allElements.push(element);
  }

  editElement(id: string, name: string, content?: string) {
    const element = this.allElements.find((element) => element.id === id);
    if (element) {
      element.name = name;
      element.content = content;
    }
  }

  editName(id: string, name: string) {
    const element = this.allElements.find((element) => element.id === id);
    if (element) {
      element.name = name;
    }
  }

  removeElement(id: string) {
    this.allElements = this.allElements.filter((element) => element.id !== id);
  }

  moveElementTrash(id: string) {
    const trashedEl = this.allElements.filter((element) => element.id === id);
    this.trashElements.push(trashedEl[0]);
    this.removeElement(id);
  }

  restoreElement(id: string) {
    const restoreEl = this.trashElements.filter(
      (trashElement) => trashElement.id === id
    )[0];
    this.allElements.push(restoreEl);
    this.deleteElement(id);
  }

  deleteElement(id: string) {
    this.trashElements = this.trashElements.filter(
      (element) => element.id !== id
    );
  }
}

export default new AddElements();
