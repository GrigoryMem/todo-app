// отвечает за форму за ее отображение и взаимодействие с пользователем
//за разметку формы
export  class Form {
  protected formElement: HTMLFormElement;
  protected inputField: HTMLInputElement;

  constructor(formElement: HTMLFormElement, protected handleFormSubmit: Function) {
    this.formElement = formElement;
    this.inputField = this.formElement.querySelector('.todo-form__input') as HTMLInputElement;
    this.formElement.addEventListener('submit',(evt)=>{
      evt.preventDefault();
      // обработчик действий пользователя содержится вне класса
      this.handleFormSubmit(this.inputField.value)
      console.log("this.inputField.value")
    })
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
}

