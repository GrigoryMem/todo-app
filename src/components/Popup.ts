export interface IPopup {
  content: HTMLElement;
  open();
  close();
}


class Popup implements IPopup {
  protected closeButton: HTMLButtonElement;
  protected _content: HTMLElement; //приватное или защищённое поле по соглашению.
  // Это не делает свойство действительно приватным, но даёт понять:
  //  "Эй, не трогай напрямую, лучше используй геттеры/сеттеры, если они есть".
  constructor(protected container:HTMLElement) {
   
// this.closeButton	Закрывает попап по кнопке
    this.closeButton = container.querySelector('.popup__close');
    this._content = container.querySelector('.popup__content');
    // Закрывает попап по кнопке
    this.closeButton.addEventListener('click', this.close.bind(this))
    // То есть при клике на фон — попап закрывается:
    this.container.addEventListener('click',this.close.bind(this))
    this._content.addEventListener('click',(event)=>event.stopPropagation())
    // Это значит: если пользователь кликнул внутри содержимого 
    // попапа — событие "click" не должно всплывать вверх.
    // Без stopPropagation() даже клик по содержимому тоже бы закрыл попап.
    // Но клик внутри .popup__content не должен
    //  закрывать попап → поэтому и нужно event.stopPropagation().
  }
//  устанавливаем внутренне содержимое popup
  set content(value:HTMLElement){
    this._content.replaceChildren(value)
  }

  open(){
    this.container.classList.add('.popup_is-opened')
  }
  close(){
    this.container.classList.remove('.popup)_is-opened')
    // очистка содержимого поля от прошлого использования
    this.content = null

  }

}