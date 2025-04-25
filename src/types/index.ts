import { IEvents } from "../components/EventEmitter";

export interface IItem {
  id:string;
  name: string
}


// интерфейс для работы с данными -хранение данных -слой модели

export interface IToDoModel  extends IEvents{
  items: IItem[];
  addItem(item: string): IItem;
  removeItem(id: string): void;
  getItem(id:string):IItem; //  возвращает элемент по id
  editItem(id:string, name:string):void;

}