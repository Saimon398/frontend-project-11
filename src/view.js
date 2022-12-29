import { getPost } from './utils/getters.js';
import { createElement, createCard } from './utils/fabrics.js';

const renderError = (error, elements, state, i18nextInstance) => {
  const message = i18nextInstance.t(`errors.${error.key}`);
  elements.control.input.classList.add('is-invalid');
  elements.validation.feedback.classList.add('d-block', 'text-danger');
  elements.validation.feedback.textContent = message;
};

const renderFeeds = (feeds, elements, state, i18nextInstance) => {
  elements.content.feeds.innerHTML = '';
  const container = createCard(i18nextInstance.t('cards.feeds'));
  elements.content.feeds.appendChild(container);

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

const renderPosts = (loadedPosts, elements, state, i18nextInstance) => {
  elements.content.posts.innerHTML = '';
  const container = createCard(i18nextInstance.t('cards.posts'));
  elements.content.posts.appendChild(container);

  const postElems = loadedPosts.flatMap(({ feedId, posts }) => posts.map(({ id, title, link }) => {
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

const renderVisitedPosts = (visited, elements, state) => {
  const { title, description, link } = getPost(state.posts, visited);
  elements.modal.title.textContent = title;
  elements.modal.description.textContent = description;

  const post = document.querySelector(`[data-id="${visited.postid}"]`);
  post.classList.remove('fw-bold', 'link-secondary');
  post.classList.add('fw-normal', 'link-secondary');
  elements.modal.button.setAttribute('href', link);
};

const renders = {
  error: (...params) => renderError(...params),
  feeds: (...params) => renderFeeds(...params),
  posts: (...params) => renderPosts(...params),
  visited: (...params) => renderVisitedPosts(...params),
};

export default (state, elements, i18nextInstance) => (path, value) => {
  const render = renders[path];
  render(value, elements, state, i18nextInstance);
};
