import "./styles/styles.css"
import {todos} from './utils/constants';
import {Item} from './components/Item'
const contentElement = document.querySelector('.todos__list') 

const template = document.querySelector('#todo-item-template') as HTMLTemplateElement;

function handleSubmitForm(data:string){
  // data - строка из поля ввода
    const todoItem = new Item(template);
    const itemElement = todoItem.render(data);
    contentElement.prepend(itemElement);
    to

}


todos.forEach((item)=>{
  const todoItem = new Item(template)
  const itemElement = todoItem.render(item)
  contentElement.prepend(itemElement)
})

