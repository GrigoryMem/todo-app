import "./styles/styles.css"
import {todos} from './utils/constants';
import {Item} from './components/item';
import {Form} from './components/Form';
import {ToDoModel} from './components/ToDoModel';
import {Page} from './components/Page';
import {ItemPresenter} from './components/ToDoPresenter';
const contentElement = document.querySelector('.content') as HTMLElement;


// создаем экземпляр страницы для отображения всех элементов страницы
const itemContainer = new Page(contentElement);
// создание модели данных
const todoArray = new ToDoModel();
// модель данных- это наш массив данных, мы можем получать его и от сервера
todoArray.items = todos;


// todoArray/page - принцип инверсии зависимостей и ежинствееной ответс
const itemPresenter = new ItemPresenter(todoArray, Form, itemContainer, Item);
itemPresenter.init()
itemPresenter.renderView();
