import { IItem } from "../types";
import { IToDoModel } from "../types";
// слой модели/данных - накопление данных, их изменение

export class ToDoModel implements IToDoModel {
  protected _items:IItem[];

  constructor() {
    this._items = [];
  }

  set items(data: IItem[]){
    this._items = data;
  }

  get items(){
    return this._items;
  }

  addItem(data: string) {
    // если крупное приложени то библиотека по генерации  уникального id
      const uniqueId:number = Math.max(...this._items.map(item => Number(item.id)))+1;
      const newItem:IItem = {id:String(uniqueId), name: data,}
      this._items.push(newItem);
      return newItem
  }

  removeItem(id: string){
    this._items = this._items.filter(item => item.id !== id);
  }

  getItem(id:string):IItem{
    return this._items.find(item => item.id === id);
  }
}