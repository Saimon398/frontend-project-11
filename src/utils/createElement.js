/**
 * @description Returns HTML-element with 'classes' and 'attributes'
 * @param {String} name Tag's name
 * @param {Array []} classes Element's classes
 * @param {Object {}} attributes Element's attributes
 * @returns
 * @example
 * const title = createElement('h1', ['text-white', 'fs-32']);
 * console.log(title); // => <h1 class="text-white fs-32"></h1>
 */
export default (name, classes = [], attributes = {}) => {
  const element = document.createElement(name);
  element.classList.add(...classes);
  Object.entries(attributes)
    .forEach(([name, value]) => element.setAttribute(name, value));

  return element;
};
