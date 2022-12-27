/**
 * @description Returns HTML-element with set classes and attributes
 * @param {String} name Tag's name
 * @param {Array []} classes Element's classes
 * @param {Object {}} attributes Element's attributes
 * @returns {Element}
 * @example
 * const title = createElement('h1', ['text-white', 'fs-32']);
 * console.log(title); // => <h1 class="text-white fs-32"></h1>
 */
export default (name, classes = [], attributes = {}) => {
  const element = document.createElement(name);
  element.classList.add(...classes);
  Object
    .entries(attributes)
    .forEach(([attrName, attrValue]) => element.setAttribute(attrName, attrValue));

  return element;
};
