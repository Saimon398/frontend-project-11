const parser = new DOMParser();

/**
 * @description Returns parsed XML-Document
 * @param {String} source XML-document
 * @returns {Promise<string>} Parsed XML-document
 */
export default (data) => {
  const { contents } = data;
  const xmlDocument = parser.parseFromString(contents, 'text/xml');
  const rootName = xmlDocument.documentElement.tagName.toLowerCase();
  if (rootName !== 'rss') {
    throw new Error('There is no RSS in the document!');
  }
  return xmlDocument;
};
