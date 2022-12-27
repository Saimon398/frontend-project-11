import createElement from './utils/createElement.js';
import filterPost from './utils/getPost.js';

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

const renderErrors = (errors, elements, state, i18nextInstance) => {
  elements.control.input.classList.add('is-invalid');
  elements.validation.feedback.classList.add('d-block', 'text-danger');
  elements.validation.feedback.textContent = i18nextInstance.t('errors.validation');
};

const renderFeeds = (feeds, elements, state, i18nextInstance) => {
  elements.content.feeds.innerHTML = '';
  const container = createCard(i18nextInstance.t('cards.feeds'));
  elements.content.feeds.appendChild(container);

  // Успешное добавление RSS
  elements.control.input.classList.remove('is-invalid');
  elements.validation.feedback.classList.remove('text-danger');
  elements.validation.feedback.classList.add('d-block', 'text-success');
  elements.validation.feedback.textContent = i18nextInstance.t('main.success');
  elements.control.form.reset();
  elements.control.form.focus();

  const feedElems = feeds.map(({ title, description }) => {
    const li = createElement('li', ['list-group-item', 'border-0', 'border-end-0']);
    const heading = createElement('h3', ['h6', 'm-0']);
    const desc = createElement('p', ['m-0', 'small', 'text-black-50']);
    heading.textContent = title;
    desc.textContent = description;
    li.append(heading, desc);

    return li;
  });

  container.querySelector('.list-group').append(...feedElems);
};

const renderPosts = (posts, elements, state, i18nextInstance) => {
  elements.content.posts.innerHTML = '';
  const container = createCard(i18nextInstance.t('cards.posts'));
  elements.content.posts.appendChild(container);

  const postElems = posts.flatMap(({ feedId, posts }) => posts.map(({ id, title, link }) => {
    const li = createElement('li', [
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    ]);
    const a = createElement('a', ['fw-bold'], {
      href: link,
      'data-feedId': feedId,
      'data-id': id,
      target: '_blank',
      rel: 'noopener norefferer',
    });
    const button = createElement('button', ['btn', 'btn-outline-primary', 'btn-sm'], {
      type: 'button',
      'data-feedId': feedId,
      'data-id': id,
      'data-bs-toggle': 'modal',
      'data-bs-target': '#modal',
    });

    a.textContent = title;
    button.textContent = i18nextInstance.t('cards.button');
    li.append(a, button);

    return li;
  }));

  container.querySelector('.list-group').append(...postElems);
};

const renderVisitedPosts = (visited, elements, state, i18nextInstance) => {
  // Здесь мы добавляем контент в модальное окно
  const { title, description } = filterPost(state.posts, visited);
  elements.modal.title.textContent = title;
  elements.modal.description.textContent = description;
  //  Здесь происходит изменение элемента 
  const link = document.querySelector(`[data-id="${visited.postid}"]`);
  link.classList.remove('fw-bold', 'link-secondary');
  link.classList.add('fw-normal', 'link-secondary');
};

const renders = {
  errors(errors, elements, state, i18nextInstance) {
    return renderErrors(errors, elements, state, i18nextInstance);
  },
  feeds(feeds, elements, state, i18nextInstance) {
    return renderFeeds(feeds, elements, state, i18nextInstance);
  },
  posts(posts, elements, state, i18nextInstance) {
    return renderPosts(posts, elements, state, i18nextInstance);
  },
  visited(visitedPosts, elements, state, i18nextInstance) {
    return renderVisitedPosts(visitedPosts, elements, state, i18nextInstance);
  },
};

export default (state, elements, i18nextInstance) => (path, value) => {
  const render = renders[path];
  render(value, elements, state, i18nextInstance);
};
