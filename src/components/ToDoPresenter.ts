import { IToDoModel } from '../types';
import { IViewItem, IViewItemConstructor } from './item';
import { IForm, IFormConstructor } from './Form';
import { IPage } from './Page';
import {IPopup} from './Popup';
import { IItem } from '../types';
// ItemPresenter — это контролирующий класс, который:

// берет шаблоны из DOM;

// создает формы и элементы;

// работает с моделью;

// обновляет интерфейс при изменениях.
// презентер отвачает за отображение всего ,за работу с данными, за взаимодействие нашими классами другими
export class ItemPresenter {
	protected itemTemplate: HTMLTemplateElement;
	protected formTemplate: HTMLTemplateElement;
	protected todoForm: IForm;
	protected todoEditForm: IForm;
    protected handleSubmitEditForm:(data:{value:string})=>void

	constructor(
        // создание экземпляров визуальных компонентов на основе шаблонов.
		protected model: IToDoModel,  // model: источник данных — список задач 
		protected formConstructor: IFormConstructor, // конструктор формы кот исполь для созд нов форм
		protected viewPageContainer: IPage, // страница для отобр всех блоков(напр дела и форма)
		protected viewItemConstructor: IViewItemConstructor,// класс, который умеет создавать визуальные элементы задач типа Item;
        protected modal: IPopup // ссылка на модальное окно, почему не получаем классом как viewItemConstructor напр????
        ) {
            // : HTML-шаблоны (<template>) для задачи и формы.
            this.itemTemplate = document.querySelector(
                '#todo-item-template'
            ) as HTMLTemplateElement;
            this.formTemplate = document.querySelector(
                '#todo-form-template'
            ) as HTMLTemplateElement;
        }

        init() {
            // Создаем экземпляр формы для создания нового дела
            // инициализацию формы ввода задачи;
            // Создает форму ДОБАВЛЕНИЯ нового дела с помощью конструктора формы и переданного шаблона.
            // данная форма отображается сразу на главной странице
            this.todoForm = new this.formConstructor(this.formTemplate) // обяз соответствие интерфейсу IFormConstructor
            // Устанавливает обработчик события "отправки формы" — handleSubmitForm.
          
            this.todoForm.buttonText = 'Добавить'
            this.todoForm.placeHolder = 'Следующее дело'
            // Вставляет форму в интерфейс (formContainer).
            this.viewPageContainer.formContainer = this.todoForm.render();

             // Создает форму ИЗМЕНЕНИЯ нового дела с помощью конструктора формы и переданного шаблона.
            //  т.е. создаем еще один экзмемпляр формы т к форма это компонент
            this.todoEditForm = new this.formConstructor(this.formTemplate)
            this.todoEditForm.buttonText = 'Изменить'
            this.todoEditForm.placeHolder = 'Новое название'
            // обработчик который срабатывает на любое изменение данных:
            this.model.on('changed', ()=>{
                // что делать если изменились данные, рендерим страницу
                // Перерисовывает список задач.(обновляем отображение задач)
                this.renderView()
            })
            // ????
            // либо использовать bind чтобы не потерять контекст при работе слушателей:
            this.todoForm.on('submit',this.handleSubmitForm.bind(this));
            // чтобы зафиксировать id элемента которыймы редактируем
            // обработчик сабмита редактирования дела 
            // - устанавливается при каждом открытии модального окна
            //  когда мы редактируем дело
            //  засчет стрелочной функции не теряется контекст - он будет вызван с привязкой к этому классу Item{resenter}
            this.todoEditForm.on('submit',(data:{value:string})=>this.handleSubmitEditForm(data))
           
            
        }

        handleSubmitForm(data: {value:string}) {
             // обработчик добваления задачи -Когда пользователь добавляет новую задачу:
            this.model.addItem(data.value);// Добавляет задачу в модель.
          
            this.todoForm.clearValue();//Очищает форму.
        }
     
        handleCopyItem(item: {id: string}) {
            // item: IViewItem - передается объект this см Item метод setCopyHandler т е this это экземпляр отображения карточки
                //     // обработчик копирования задачи
        //     // Копирует задачу по ID.
            const copyedItem = this.model.getItem(item.id)
        //     // Добавляет копию в список.
            this.model.addItem(copyedItem.name); // название используется чтобы создать новое дело
        //     // Перерисовывает интерфейс.

        }
        
        handleDeleteItem(item: {id: string}) {
            // удалить элемент из модели
            this.model.removeItem(item.id)
          
        }
        // обработчик для самой кнопки редактирования
        handleEditItem(item: {id: string}){
            // item:IViewItem  получаем экземпляр класса Item в кот произошло нажатие
            // найдем элемент массива  item в модели данных
            const editedItem = this.model.getItem(item.id)
            //  установим значение инпута формы  поле ввода редактирования как значение нашего массива
            this.todoEditForm.setValue(editedItem.name);
            // в модальное окно добавляем форму редактирования - генерируем контент модально окна
            this.modal.content = this.todoEditForm.render();
            // устанавливаем обработчик для сабмита формы
            // функция высшего и низшкго порядка???? вспомни карирование и функции высшего низшего порядка?
            // this.todoEditForm.setHandler((data:string)=>this.handleSubmitEditForm(data, item.id))
                //  при каждом открытии формы мы пересоздаем функцию обработчик:
              // обработчик сабмита редактирования дела
            //   создаем обработчик  редактировани формы при каждом открытии формы
            this.handleSubmitEditForm = (data: {value:string})=>{
                // data: {value:string} - новое значение принимается в параметраз обработчика
                
                // item.id - замыкание с handleEditItem, получаем id редактируемого элемента
                // редактируем в модели
                this.model.editItem(item.id, data.value);
                // очищаем форму
                this.todoEditForm.clearValue()
                // закрываем модалку
                this.modal.close()
            }


            this.modal.open()
        }   
        
        renderView() {
            // отображение списка задач;-Для каждого элемента из модели создает визуальный компонент:
            const itemList = this.model.items.map((item) => {
            const todoItem = new this.viewItemConstructor(this.itemTemplate); // визуализируем нашу задачу
                // Назначаем обработчики копирования и удаления.
                // Мы говорим: "Когда пользователь нажмёт на кнопку копирования этой карточки — 
                // вызови вот эту функцию handleCopyItem, и чтобы внутри неё this был ItemPresenter".
                // те в setCopyHandler  мы передаем функцию перезнтера в контексте самого презентера
                //  которая затем обрабазывает сам экземпляр Item
                // Получается, что Item сообщает Presenter'у: "Вот я, карточка,
                //  по мне кликнули. Делай с этим что хочешь."
                //  установим обработчики для каждой карточки
                // подписываемся на события для кароточки:
                // мы подписываемся на события каждого экземпляра карточки (todoItem).
    			todoItem.on('copy',this.handleCopyItem.bind(this))
                todoItem.on('delete',this.handleDeleteItem.bind(this))
                todoItem.on('edit',this.handleEditItem.bind(this))
                // Рендерит HTML для каждого элемента.
            const itemElement = todoItem.render(item);
            return itemElement;
            }).reverse();
            // Устанавливает список в контейнер для отображения на странице
            this.viewPageContainer.todoContainer = itemList;
        }
    }
    // Простыми словами
    // Presenter даёт Item'у функцию:
    // «Позови меня, когда по тебе кликнут».
    
    // Item зовёт Presenter, передавая себя:
    // «Эй, вот я! Пользователь нажал на меня!»
    
    // Presenter обрабатывает ситуацию:
    // «Отлично, дублирую тебя в список и перерисовываю всё».


