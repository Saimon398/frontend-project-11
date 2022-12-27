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
export default (title) => {
  const card = createElement('div', ['card', 'border-0']);
  const body = createElement('div', ['card-body']);
  const heading = createElement('h2', ['card-title', 'h4']);
  const list = createElement('ul', ['list-group', 'border-0', 'rounded-0']);
  heading.textContent = title;

  body.appendChild(heading);
  card.append(body, list);

  return card;
};
