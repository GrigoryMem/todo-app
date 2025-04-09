export interface IItem {
  id:string;
  name: string
}


// интерфейс для работы с данными

export interface IToDoModel {
  items: IItem[]
  addItem(item: string): IItem
  removeItem(id: string): void

}