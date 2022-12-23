import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: { key: 'emptyness' },
  },
  string: {
    url: () => ({ key: 'validation' }),
  },
});

/**
 * Schema for address validation
 */
const schema = yup.string().required().url();

/**
 * @description Checks if the address is valid
 * @param {String} address Web-address to be checked
 * @param {Object} i18nextInstance Instance of i18next
 * @returns {Promise}
 */
export default (data, i18nextInstance) => schema.validate(data)
  .then((data) => data)
  .catch((err) => {
    const [message] = err.errors.map((err) => i18nextInstance.t(`errors.${err.key}`));
    console.error(message);
    throw err;
  });