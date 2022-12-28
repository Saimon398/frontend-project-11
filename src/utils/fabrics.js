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
const createElement = (name, classes = [], attributes = {}) => {
  const element = document.createElement(name);
  element.classList.add(...classes);
  Object
    .entries(attributes)
    .forEach(([attrName, attrValue]) => element.setAttribute(attrName, attrValue));

  return element;
};

/**
 * @description Returns HTML-card for keeping feeds and posts
 * @param {String} title Heading for particular card
 * @returns {Element} HTML-card
 * @example
 * createCard('Feeds');
 * <div class="card border-0">
 *    <div class="card-body">
 *        <h2 class="card-title h4">Feeds</h2>
 *    </div>
 *    <ul class="list-group border-0 rounded-0"></ul>
 * </div>
 */
const createCard = (title) => {
  const card = createElement('div', ['card', 'border-0']);
  const body = createElement('div', ['card-body']);
  const heading = createElement('h2', ['card-title', 'h4']);
  const list = createElement('ul', ['list-group', 'border-0', 'rounded-0']);
  heading.textContent = title;

  body.appendChild(heading);
  card.append(body, list);

  return card;
};

export {
  createElement,
  createCard,
};
