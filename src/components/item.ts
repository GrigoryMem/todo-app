import {IItem} from '../types';
// слой отображения/представления - корректное отображение и взаимодействие пользователя с карточкой

// интерфейс для элемента который создается как экземпляр этого класса
// описывает будущий объект
export interface IViewItem {
  id:string;
  name:string;
  render(item:IItem):HTMLElement;
  setCopyHandler(handler:Function):void
}

// интерфейс для конструктора описывает параметры кот принимает конструктор 
// и какой объект дает навыходе когда мы создаем экземпляр
export interface IViewItemConstructor {
  new (template: HTMLTemplateElement): IViewItem
}

export class Item implements IViewItem{

  protected itemElement: HTMLElement;
  protected title: HTMLElement;
  protected _id:string;

  constructor(template: HTMLTemplateElement){
    this.itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
    this.title = this.itemElement.querySelector('.todo-item__text');
  }

  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return this._id || '';
  }

  set name(value: string){
    this.title.textContent = value;
  }

  get name(): string {
    return this.title.textContent || '';
  }

  render(item:IItem){
    this.name = item.name; // вставляем данные в элемент используя геттер сеттер
    this.id = item.id  // аналогично
    return this.itemElement;
  }

}