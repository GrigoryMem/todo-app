import "./styles/styles.css"
import {todos} from './utils/constants';
import {Item} from './components/Item';
import {Form} from './components/Form';
import {ToDoModel} from './components/ToDoModel';
import {Page} from './components/Page';

const contentElement = document.querySelector('.content') as HTMLElement;

const itemTemplate = document.querySelector('#todo-item-template') as HTMLTemplateElement;
const formTemplate = document.querySelector('#todo-form-template') as HTMLTemplateElement;

const page = new Page(contentElement);

// создаем экземпляр формы
const todoForm = new Form(formTemplate)
// добавили обработчик к этой форме
todoForm.setHandler(handleSubmitForm)
// отобразим форму
page.formContainer = todoForm.render();

function handleSubmitForm(data:string){
  // data - строка из поля ввода
    const todoItem = new Item(itemTemplate);
    const itemElement = todoItem.render({id: '8', name: data});
    contentElement.prepend(itemElement);
    todoForm.clearValue();

}


todos.forEach((item)=>{
  const todoItem = new Item(itemTemplate)
  const itemElement = todoItem.render(item)
  contentElement.prepend(itemElement)
})


const todoArray = new ToDoModel();
todoArray.items = todos;
