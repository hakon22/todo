export default (title, description, id, isDone = false) => {
  const li = document.createElement('li');
  li.classList.add('task', 'tooltip', isDone ? 'done' : null);
  li.setAttribute('id', id);
  [0, 1, 2].forEach((number) => {
    const span = document.createElement('span');
    if (number === 0) {
      span.textContent = title;
    }
    if (number === 1) {
      span.classList.add('task__remove');
    }
    if (number === 2) {
      span.classList.add('tooltip__text');
      span.textContent = description;
    }
    li.append(span);
  });

  return li;
};
