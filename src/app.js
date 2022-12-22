import * as yup from 'yup';
import onChange from 'on-change';
import render from './view.js';

/**
 * Schema for address validation
 */
const schema = yup.string().required().url();

/**
 * @description Checks if the address is valid
 * @param {String} address Web-address to be checked
 * @returns {Promise}
 */
const validate = (data) => schema.validate(data)
  .then((data) => data)
  .catch((err) => {
    console.error(err.message);
    throw err;
  });


const elements = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
};

export default () => {

  const state = {
    valid: true,
    feeds: [],
    errors: [],
  };

  const watchedState = onChange(state, render(state, elements));

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { value } = elements.input;
    validate(value)
      .then((feed) => {
        watchedState.feeds.push(feed)
      })
      .catch((message) => {
        watchedState.errors.push(message);
      })
  })
};





