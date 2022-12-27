import axios from 'axios';

/**
 * @async
 * @description Makes GET-request to the "src" and gets content
 * @param {String} source The URL to download from
 * @returns {Promise<string>} The data from 'source' URL
 */
export default (source) => {
  const ORIGIN = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
  const url = `${ORIGIN}${encodeURIComponent(source)}`;
  return axios.get(url);
};
