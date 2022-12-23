import onChange from 'on-change';
import i18n from 'i18next';
import render from './view.js';
import resources from './locales/index.js';
import validate from './utils/validate.js';
import parse from './utils/parser.js';
import fetch from './utils/fetch.js';
import getData from './utils/getData.js';

const elements = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
};

export default () => {
  const i18nextInstance = i18n.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    resources,
  });

  const state = {
    feeds: [],
    posts: [],
    errors: [],
  };

  const watchedState = onChange(state, render(state, elements));

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { value } = elements.input;

    validate(value, i18nextInstance)
      .then((feed) => fetch(feed))
      .then(({ data }) => parse(data))
      .then((document) => {
        const { feed, posts } = getData(state, document);
        watchedState.feeds.push(feed);
        watchedState.posts.push(posts);
      })
      .catch((message) => {
        watchedState.errors.push(message);
      });
  });
};
