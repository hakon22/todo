export default (title, description, id, isDone = false) => {
  const li = document.createElement('li');
  if (isDone) {
    li.classList.add('task', 'tooltip', 'anim-show', 'done');
  } else {
    li.classList.add('task', 'tooltip', 'anim-show');
  }
  li.setAttribute('id', id);

  // так как у нас всегда три span'а, заполняем каждый по очереди по условиям
  [0, 1, 2].forEach((number) => {
    const span = document.createElement('span');
    if (number === 0) {
      span.textContent = title;
    }
    if (number === 1) {
      span.classList.add('task__remove');
      span.setAttribute('title', 'Удалить');
    }
    if (number === 2) {
      span.classList.add('tooltip__text');
      span.textContent = description;
    }
    li.append(span);
  });

  // возвращаем готовый <li>
  return li;
};
