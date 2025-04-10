import {IItem} from '../types';
// слой отображения/представления - корректное отображение и взаимодействие пользователя с карточкой
export class Item {

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