import onChange from 'on-change';
import i18n from 'i18next';
import render from './view.js';
import resources from './locales/index.js';
import validate from './utils/validate.js';
import parse from './utils/parser.js';
import fetch from './utils/fetch.js';
import { getData } from './utils/getters.js';

export default () => {
  const elements = {
    control: {
      form: document.querySelector('form'),
      input: document.querySelector('input'),
      button: document.querySelector('button'),
    },
    validation: {
      feedback: document.querySelector('.feedback'),
    },
    content: {
      feeds: document.querySelector('.feeds'),
      posts: document.querySelector('.posts'),
    },
    modal: {
      title: document.querySelector('.modal-title'),
      description: document.querySelector('.modal-description'),
      button: document.querySelector('.full-article'),
    },
  };

  const i18nextInstance = i18n.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    resources,
  });

  const state = {
    feeds: [],
    posts: [],
    added: [],
    error: null,
    visited: null,
  };

  const watchedState = onChange(state, render(state, elements, i18nextInstance));

  elements.control.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { value } = elements.control.input;
    const src = value.trim();

    validate(state, src, i18nextInstance)
      .then((feed) => fetch(feed))
      .then(({ data }) => parse(data))
      .then((document) => {
        const { feed, posts } = getData(state, document);
        watchedState.feeds.push(feed);
        watchedState.posts.push(posts);
        state.added.push(value);
      })
      .catch(({ message }) => {
        watchedState.error = message;
      });
  });

  elements.content.posts.addEventListener('click', ({ target }) => {
    const attr = target.dataset.bsTarget;
    if (attr === '#modal') {
      watchedState.visited = {
        feedid: Number(target.dataset.feedid),
        postid: Number(target.dataset.id),
      };
    }
  });
};
