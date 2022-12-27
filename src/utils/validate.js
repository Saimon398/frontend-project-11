import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: { key: 'emptyness' },
  },
  string: {
    url: () => ({ key: 'validation' }),
    // Возможно, что не в том ключе - ДОБАВИТЬ ВОЗМОЖНОСТЬ ВЫВОДА СООБЩЕНИЙ
    notOneOf: () => ({ key: 'presence'}),
  },
});

/**
 * @async
 * @description Checks if the given URL is valid
 * @param {String} address URL to be checked
 * @param {Object} i18nextInstance Instance of i18next
 * @returns {Promise<string>} 
 */
export default (state, value, i18nextInstance) => {
  const schema = yup.string().required().url().notOneOf(state.added);

  return schema
    .validate(value)
    .then((data) => data)
    .catch((e) => {
      const [message] = e.errors.map((err) => i18nextInstance.t(`errors.${err.key}`));
      console.error(message);
      throw e;
    });
};
