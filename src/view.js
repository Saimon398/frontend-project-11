import createElement from './utils/createElement.js';

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


const renderErrors = (elements, state, i18nextInstance) => {
  if (state.errors.length) {
    // Тут лучше пересмотреть подход
    elements.control.input.classList.add('is-invalid');
    elements.validation.feedback.classList.add('d-block', 'invalid-feedback', 'text-danger');
    elements.validation.feedback.textContent = i18nextInstance.t('errors.validation');
    return;
  }
  elements.control.input.classList.remove('is-invalid');
  elements.validation.feedback.classList.remove('invalid-feedback', 'text-danger');
  // При правильной первоначальной загрузке тоже нужно
  elements.validation.feedback.classList.add('valid-feedback', 'text-success');
  elements.validation.feedback.textContent = i18nextInstance.t('main.success');
  elements.control.form.reset();
  elements.control.form.focus();
};

const renderFeeds = (elements, state, i18nextInstance) => {
  elements.content.feeds.innerHTML = '';
  const container = createCard(i18nextInstance.t('cards.feeds'));
  elements.content.feeds.appendChild(container);

  const feeds = state.feeds.map(({ title, description }) => {
    const li = createElement('li', ['list-group-item', 'border-0', 'border-end-0']);
    const heading = createElement('h3', ['h6', 'm-0']);
    const desc = createElement('p', ['m-0', 'small', 'text-black-50']);
    heading.textContent = title;
    desc.textContent = description;
    li.append(heading, desc);

    return li;
  });

  container.querySelector('.list-group').append(...feeds);
};

const renderPosts = (elements, state, i18nextInstance) => {
  elements.content.posts.innerHTML = '';
  const container = createCard(i18nextInstance.t('cards.posts'));
  elements.content.posts.appendChild(container);

  const posts = state.posts.flatMap(({ posts }) => posts.map(({ feedId, title, link }) => {
    const li = createElement('li', [
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0'
    ]);
    const a = createElement('a', ['fw-bold'], {
      'href': link,
      'data-id': feedId,
      'target': '_blank',
      'rel': 'noopener norefferer',
    });
    const button = createElement('button', ['btn', 'btn-outline-primary', 'btn-sm'], {
      'type': 'button',
      'data-id': feedId,
      'data-bs-toggle': 'modal',
      'data-bs-target': '#modal',
    });

    a.textContent = title;
    button.textContent = i18nextInstance.t('cards.button');
    li.append(a, button);

    return li;
  }));

  container.querySelector('.list-group').append(...posts);
};

const renders = {
  errors: (elements, state, i18nextInstance) => renderErrors(elements, state, i18nextInstance),
  feeds: (elements, state, i18nextInstance) => renderFeeds(elements, state, i18nextInstance),
  posts: (elements, state, i18nextInstance) => renderPosts(elements, state, i18nextInstance),
};

export default (state, elements, i18nextInstance) => (path, value, previousValue) => {
  const render = renders[path];
  return render(elements, state, i18nextInstance);
};
