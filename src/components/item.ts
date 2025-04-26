import {IItem} from '../types';
import { EventEmitter,IEvents } from './EventEmitter';
// слой отображения/представления - корректное отображение и взаимодействие пользователя с карточкой

// интерфейс для элемента который создается как экземпляр этого класса
// описывает будущий объект
export interface IViewItem  extends IEvents{
  id:string;
  name:string;
  render(item:IItem):HTMLElement;
 }

// интерфейс для конструктора описывает параметры кот принимает конструктор 
// и какой объект дает навыходе когда мы создаем экземпляр
export interface IViewItemConstructor {
  new (template: HTMLTemplateElement): IViewItem
}

export class Item  extends EventEmitter implements IViewItem{

  protected itemElement: HTMLElement;
  protected title: HTMLElement;
  protected deleteButton: HTMLButtonElement;
  protected copyButton: HTMLButtonElement;
  protected editButton: HTMLButtonElement;
  protected _id:string;
 

  

  constructor(template: HTMLTemplateElement){
    super();// вызываем родительский конструктор
    this.itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
    this.title = this.itemElement.querySelector('.todo-item__text');
    this.deleteButton = this.itemElement.querySelector('.todo-item__del');
    this.copyButton = this.itemElement.querySelector('.todo-item__copy');
    this.editButton = this.itemElement.querySelector('.todo-item__edit');


    // при клике на все кнопки нужно сгенерировать события
    //  когда пользователь кликлнет сгенерируем событие соотв-го типа для нашего приложения
    this.deleteButton.addEventListener('click',()=> this.emit('delete',{id:this._id}));
    this.copyButton.addEventListener('click', ()=>this.emit('copy',{id:this._id}));
    this.editButton.addEventListener('click',()=>this.emit('edit',{id:this._id}));
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