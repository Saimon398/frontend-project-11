
const renderErrors = (errors) => {
  console.log('ОШИБКА!!!');
}

const renderFeeds = (feeds) => {
  console.log('FEED!!!');
}

const RENDERS = {
  'errors': (errors) => renderErrors(errors),
  'feeds': (feeds) => renderFeeds(feeds),
};

export default (state, elements) => (path, value, previousValue) => {
  const render = RENDERS[path];
  return render(value);
};
