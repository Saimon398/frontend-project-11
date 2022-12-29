/**
 * @description Returns filtered post by feed and post ID's
 * @param {Object []} collection Posts group
 * @param {Number} feedID Required feed-ID for searched post
 * @param {Number} postID Required post-ID for searched post
 * @returns {Object {}} Required post
 */
const getPost = (posts, target) => {
  const { feedid, postid } = target;
  const [searched] = posts
    .filter(({ feedId }) => feedId === feedid)
    .flatMap((feed) => feed.posts)
    .filter(({ id }) => id === postid);

  return searched;
};

/**
 * @description Returns data from parsed XML-document
 * @param {Object {}} state Application State
 * @param {String} document Parsed XML-document
 * @returns {Object {}} Data as { feed: {...}, posts: {...}, }
 */
const getData = (state, document) => {
  const id = state.feeds.length + 1;
  const elements = {
    title: document.querySelector('channel title'),
    description: document.querySelector('channel description'),
    items: document.querySelectorAll('channel item'),
  };

  const channelItems = [...elements.items].map((item, index) => {
    const postID = index + 1;
    const title = item.querySelector('title');
    const link = item.querySelector('link');
    const description = item.querySelector('description');
    return {
      id: postID,
      title: title.textContent,
      description: description.textContent,
      link: link.textContent,
    };
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

export {
  getPost,
  getData,
};
