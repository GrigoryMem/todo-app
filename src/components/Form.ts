// отвечает за форму за ее отображение и взаимодействие с пользователем
//за разметку формы
// интерфейс предусмвтривает основной функционал формы
export interface IForm {
  buttonText: string;
  placeholder: string;
  setHandler(handler: Function): void
  render(): HTMLFormElement;
  setValue(data:string):void;
  getValue():string;
  clearValue():void
}

export interface IFormConstructor {
  new (formTemplate: HTMLTemplateElement): IForm
}




export  class Form {
  protected formElement: HTMLFormElement;
  protected inputField: HTMLInputElement;
  protected handleFormSubmit: Function;
  protected submitButton: HTMLButtonElement;

  constructor(formTemplate: HTMLTemplateElement) {
    // нужные элементы формы сохраняем в полях класса
    this.formElement = formTemplate.content.querySelector('.todos__form').cloneNode(true) as HTMLFormElement;
    this.inputField = this.formElement.querySelector('.todo-form__input') as HTMLInputElement;
    this.submitButton = this.formElement.querySelector('.todo-form__submit-btn');

    this.formElement.addEventListener('submit',(evt)=>{
      evt.preventDefault();
      // обработчик действий пользователя содержится вне класса , но является полем класса
      this.handleFormSubmit(this.inputField.value)

    })

  }

  setHandler(handleFormSubmit: Function){
    this.handleFormSubmit = handleFormSubmit
  }
  
  render(){
    return this.formElement
  }

  setValue(data: string){
    this.inputField.value = data
  }

  getValue(){
    return this.inputField.value;
  }

  clearValue(){
    this.formElement.reset();
  }

  set buttonText(data: string) {
    this.submitButton.textContent = data;
  }

  set placeHolder(data: string) {
    this.inputField.placeholder = data;
  }
}

