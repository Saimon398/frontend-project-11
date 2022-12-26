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
  // Создается объект с постами { title, link }
  const channelItems = [...elements.items].map((item) => {
    const title = item.querySelector('title');
    const link = item.querySelector('link');
    return {
      title: title.textContent,
      link: link.textContent,
    };
  });

  const channelInfo = {
    title: elements.title.textContent,
    description: elements.description.textContent,
  };

  const feed = { id, ...channelInfo };
  // Создается объект типа: { feedId, posts: [{ title, link }, { title, link }] };
  // Посты - массив с объектами
  const posts = { feedId: id, posts: channelItems };

  return {
    feed,
    posts,
  };
};
