import axios from 'axios';

const ORIGIN = 'https://allorigins.hexlet.app/get?disableCache=true&url=';

/**
 * @description Makes GET-request to the "src" and gets content
 * @param {String} src
 * @returns {Promise}
 */
export default (source) => {
  const url = `${ORIGIN}${encodeURIComponent(source)}`;
  return axios.get(url);
};
