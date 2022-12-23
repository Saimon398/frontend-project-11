/**
 * @description Returns info of channel and its items
 * @param {Object {}} state
 * @param {String} document
 * @returns {Object}
 */
export default (state, document) => {
  const id = state.feeds.length + 1;
  const elements = {
    title: document.querySelector('channel title'),
    description: document.querySelector('channel description'),
    items: document.querySelectorAll('channel item'),
  };

  const channelItems = [...elements.items].map((item) => {
    const title = item.querySelector('title');
    const description = item.querySelector('description');
    const link = item.querySelector('link');
    return { title, description, link };
  });

  const channelInfo = {
    title: elements.title.textContent,
    description: elements.description.textContent,
  };

  const feed = { id, ...channelInfo };
  const posts = { feedId: id, posts: channelItems };

  return {
    feed,
    posts,
  };
};
