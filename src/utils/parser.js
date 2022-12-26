import axios from 'axios';

const parser = new DOMParser();

/**
 * @description Parses XML-Document
 * @param {String} source RSS-address
 * @returns {Promise}
 */
export default (data) => {
  const { contents } = data;
  const xmlDocument = parser.parseFromString(contents, 'text/xml');

  console.log(xmlDocument);
  const rootName = xmlDocument.documentElement.tagName.toLowerCase();
  console.log(rootName);
  if (rootName !== 'rss') {
    throw new Error('There is no RSS in the document!');
  }
  return xmlDocument;
};
