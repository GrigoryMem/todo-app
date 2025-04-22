import {IItem} from '../types';
// слой отображения/представления - корректное отображение и взаимодействие пользователя с карточкой

// интерфейс для элемента который создается как экземпляр этого класса
// описывает будущий объект
export interface IViewItem {
  id:string;
  name:string;
  render(item:IItem):HTMLElement;
  setDeleteHandler(handleDeleteItem:Function):void
  setCopyHandler(handleCopyItem:Function):void
 }

// интерфейс для конструктора описывает параметры кот принимает конструктор 
// и какой объект дает навыходе когда мы создаем экземпляр
export interface IViewItemConstructor {
  new (template: HTMLTemplateElement): IViewItem
}

export class Item implements IViewItem{

  protected itemElement: HTMLElement;
  protected title: HTMLElement;
  protected deleteButton: HTMLButtonElement;
  protected copyButton: HTMLButtonElement;
  protected _id:string;
  protected handleDeleteItem: Function;// поле для обработчика удаления
  protected handleCopyItem: Function; // поле для обработчика копирования

  

  constructor(template: HTMLTemplateElement){
    this.itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
    this.title = this.itemElement.querySelector('.todo-item__text');
    this.deleteButton = this.itemElement.querySelector('.todo-item__del');
    this.copyButton = this.itemElement.querySelector('.todo-item__copy');
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

  setDeleteHandler(handleDeleteItem: Function): void {
    this.handleDeleteItem = handleDeleteItem;
    this.deleteButton.addEventListener('click',(evt)=>{
      this.handleDeleteItem(this)
    })
  }

  setCopyHandler(handleCopyItem: Function): void {
      this.handleCopyItem = handleCopyItem // назначаем полю класса обработчик
      this.copyButton.addEventListener('click',
      (evt)=>{
        // см ItemPresenter метод handleCopyItem !!!
        // те в setCopyHandler  мы передаем функцию перезнтера в контексте самого презентера
                //  которая затем обрабазывает сам экземпляр Item - this здесь — экземпляр Item, то есть конкретная карточка.
        this.handleCopyItem(this) // вызываем обработчик - как поле класса
        // в кач параметра мы будем передавать экземпляр самого класса
        // чтобы вобработчике можно прописать люб действия 
        //которые нам могут потребоваться  
        //  this позвполучить доступ ко всем данным карточки которые есть на экране
      })
  }
  

  render(item:IItem){
    this.name = item.name; // вставляем данные в элемент используя геттер сеттер
    this.id = item.id  // аналогично
    return this.itemElement;
  }

 

 

}