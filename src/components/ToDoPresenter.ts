import { IToDoModel } from '../types';
import { IViewItem, IViewItemConstructor } from './Item';
import { IForm, IFormConstructor } from './Form';
import { IPage } from './Page';
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

	constructor(
        // создание экземпляров визуальных компонентов на основе шаблонов.
		protected model: IToDoModel,  // model: источник данных — список задач 
		protected formConstructor: IFormConstructor, // конструктор формы кот исполь для созд нов форм
		protected viewPageContainer: IPage, // страница для отобр всех блоков(напр дела и форма)
		protected viewItemConstructor: IViewItemConstructor,// класс, который умеет создавать визуальные элементы задач типа Item;
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
            // инициализацию формы ввода задачи;
            // Создает форму с помощью конструктора формы и переданного шаблона.
            this.todoForm = new this.formConstructor(this.formTemplate) // обяз соответствие интерфейсу IFormConstructor
            // Устанавливает обработчик события "отправки формы" — handleSubmitForm.
            this.todoForm.setHandler(this.handleSubmitForm.bind(this));
            // Вставляет форму в интерфейс (formContainer).
            this.viewPageContainer.formContainer = this.todoForm.render();
        }

        handleSubmitForm(data: string) {
             // обработчик добваления задачи -Когда пользователь добавляет новую задачу:
            this.model.addItem(data);// Добавляет задачу в модель.
            this.renderView();// Перерисовывает список задач.(обновляем отображение задач)
            this.todoForm.clearValue();//Очищает форму.
        }

        // handleCopyItem(item: IViewItem) {
        //     // обработчик копирования задачи
        //     // Копирует задачу по ID.
        //     const copyedItem = this.model.getItem(item.id)
        //     // Добавляет копию в список.
        //     this.model.addItem(copyedItem.name);
        //     // Перерисовывает интерфейс.
        //     this.renderView();
        // }
    
        // handleDeleteItem(item: IViewItem) {
        //     // обработчик удаления задачи
        //     // Удаляет задачу по ID.
        //     this.model.removeItem(item.id);
        //     // Обновляет интерфейс.
        //     this.renderView();
        // }    

        renderView() {
            // отображение списка задач;-Для каждого элемента из модели создает визуальный компонент:
            const itemList = this.model.items.map((item) => {
            const todoItem = new this.viewItemConstructor(this.itemTemplate); // визуализируем нашу задачу
                // Назначаем обработчики копирования и удаления.
    			// todoItem.setCopyHandler(this.handleCopyItem.bind(this))
    			// todoItem.setDeleteHandler(this.handleDeleteItem.bind(this))
                // Рендерит HTML для каждого элемента.
            const itemElement = todoItem.render(item);
            return itemElement;
            }).reverse();
            // Устанавливает список в контейнер для отображения на странице
            this.viewPageContainer.todoContainer = itemList;
        }
    }
