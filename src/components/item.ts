export function createItem(template:HTMLTemplateElement,name: string) {
  const itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
  const title = itemElement.querySelector('.todo-item__text')
  title.textContent = name;
  return itemElement
}