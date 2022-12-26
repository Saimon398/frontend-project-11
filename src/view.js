const renderErrors = (elements, state) => {
  if(state.errors.length) {
    elements.control.input.classList.add('is-invalid');
    elements.validation.invalidFeedback.classList.add('d-block');
    return;
  }
  elements.control.input.classList.remove('is-invalid');
  elements.validation.invalidFeedback.classList.remove('d-block');
  elements.control.form.reset();
  elements.control.form.focus();
};

const renderFeeds = (elements, state) => {
  // Здесь отрисовываются потоки
};

const renderPosts = (elements, state) => {
  // Здесь отрисовываются посты
  console.log(state);
};

const renders = {
  errors: (elements, state) => renderErrors(elements, state),
  feeds: (elements, state) => renderFeeds(elements, state),
  posts: (elements, state) => renderPosts(elements, state),
};

export default (state, elements) => (path, value, previousValue) => {
  const render = renders[path];
  return render(elements, state);
};
