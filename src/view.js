const renderErrors = (errors) => {
  console.log(errors);
};

const renderFeeds = (feeds) => {
  console.log(feeds);
};

const renderPosts = (posts) => {
  console.log(posts);
};

const renders = {
  errors: (errors) => renderErrors(errors),
  feeds: (feeds) => renderFeeds(feeds),
  posts: (posts) => renderPosts(posts),
};

export default (state, elements) => (path, value, previousValue) => {
  const render = renders[path];
  return render(value);
};
