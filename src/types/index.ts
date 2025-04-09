export interface IItem {
  id:string;
  name: string
}


// интерфейс для работы с данными

export interface IToDoModel {
  items: IItem[]
  addItem(item: IItem): void
  removeItem(id: string): void

}