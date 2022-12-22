import onChange from 'on-change';
import render from './view.js';
import i18n from 'i18next';
import resources from './locales/index.js';
import validate from './validate.js';


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
    errors: [],
  };

  const watchedState = onChange(state, render(state, elements));

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { value } = elements.input;

    validate(value, i18nextInstance)
      .then((feed) => {
        watchedState.feeds.push(feed)
      })
      .catch((message) => {
        watchedState.errors.push(message);
      })
  })
};





