import { IItem } from "../types";
import { IToDoModel } from "../types";
import { EventEmitter } from "./EventEmitter";
// слой модели/данных - накопление данных, их изменение

export class ToDoModel extends EventEmitter implements IToDoModel {
  protected _items:IItem[];

  constructor() {
    super();// выпонляем констуруктор родителя
    this._items = [];
  }

  set items(data: IItem[]){
    this._items = data;
    // как только сохранили массив,генерериуем событие
    this.emit('changedArr', this._items)
  }

  get items(){
    return this._items;
  }

  addItem(data: string) {
    // если крупное приложени то библиотека по генерации  уникального id
      const uniqueId:number = Math.max(...this._items.map(item => Number(item.id)))+1;
      const newItem:IItem = {id:String(uniqueId), name: data,}
      this._items.push(newItem);
      // при добавлении элемента в массив тоже генерируем событие
      this.emit('changed')
      return newItem
  }

  removeItem(id: string){
    // const removeElem = this._items.find(item=>item.id===id) 

    this._items = this._items.filter(item => item.id !== id);
    // при удалении элемента в массив тоже генерируем событие
  //  генерируем событие
    this.emit('changed')
  
  }

  editItem(id:string, name:string){
    const editedItem = this._items.find(item=>item.id===id)
    editedItem.name = name
    // при редактировании элемента в массив тоже генерируем событие
    this.emit('changed')
  }

  getItem(id:string):IItem{
    return this._items.find(item => item.id === id);
  }
}