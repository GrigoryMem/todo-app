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
  todoArray.addItem(data)
  // после добавелние дела очищаем форму
  todoForm.clearValue()
  // после изменения массива карточек вызываем изменение отображения - поменялись данные
  // перерендерили страницу
  renderTodoItems()
}

// выводим из массива данных - создаем массив карточек который  потом выведем на страницу

// функция которая генерирует карточки на страницу из массива 
function renderTodoItems(){
  page.todoContainer= todoArray.items.map((item)=>{ //возврщаем массив готовых карточек
    // одеваем данные карточки в разметку
    const todoItem = new Item(itemTemplate)
    const itemElement = todoItem.render(item)
    return itemElement
  }).reverse();
}

// отображение карточек
renderTodoItems();

