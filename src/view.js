const renderErrors = (errors) => {
  // Здесь отрисовывается рамка
  console.log(errors);
};

const renderFeeds = (feeds) => {
  // Здесь отрисовываются потоки
  console.log(feeds);
};

const renderPosts = (posts) => {
  // Здесь отрисовываются посты
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
