import "./styles/styles.css"
import {todos} from './utils/constants';
import {Item} from './components/Item';
import {Form} from './components/Form';
import {ToDoModel} from './components/ToDoModel';
import {Page} from './components/Page';

const contentElement = document.querySelector('.content') as HTMLElement;


// создаем экземпляр страницы для отображения всех элементов страницы
const page = new Page(contentElement);
// создание модели данных
const todoArray = new ToDoModel();
// модель данных- это наш массив данных, мы можем получать его и от сервера
todoArray.items = todos;





