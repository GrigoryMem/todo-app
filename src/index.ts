import "./styles/styles.css"
import {todos} from './utils/constants';
import {Item} from './components/Item';
import {Form} from './components/Form';
import {ToDoModel} from './components/ToDoModel';
import {Page} from './components/Page';

const contentElement = document.querySelector('.content') as HTMLElement;

const itemTemplate = document.querySelector('#todo-item-template') as HTMLTemplateElement;
const formTemplate = document.querySelector('#todo-form-template') as HTMLTemplateElement;
// создаем экземпляр страницы для отображения всех элементов страницы
const page = new Page(contentElement);
// создание модели данных
const todoArray = new ToDoModel();
// модель данных- это наш массив данных, мы можем получать его и от сервера
todoArray.items = todos;
// создаем экземпляр формы
const todoForm = new Form(formTemplate)
// добавили обработчик к этой форме
todoForm.setHandler(handleSubmitForm)
// отобразим форму
page.formContainer = todoForm.render();
// обработчик формы
function handleSubmitForm(data:string){
  // data - строка из поля ввода
    const todoItem = new Item(itemTemplate);
    const itemElement = todoItem.render({id: '8', name: data});
    contentElement.prepend(itemElement);
    todoForm.clearValue();

}

// выводим из массива данных - создаем массив карточек который  потом выведем на страницу

page.todoContainer= todoArray.items.map((item)=>{
  // одеваем данные карточки в разметку
  const todoItem = new Item(itemTemplate)
  const itemElement = todoItem.render(item)
  return itemElement
})



