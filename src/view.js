
const renderErrors = (errors) => {
  console.log(errors);
}

const renderFeeds = (feeds) => {
  console.log(feeds);
}

const RENDERS = {
  'errors': (errors) => renderErrors(errors),
  'feeds': (feeds) => renderFeeds(feeds),
};

export default (state, elements) => (path, value, previousValue) => {
  const render = RENDERS[path];
  return render(value);
};
