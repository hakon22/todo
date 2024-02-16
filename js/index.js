/* eslint-disable no-new */
import '../scss/app.scss';
import { openModal, closeModal } from './modal.js';
import scrollTop, { onScroll } from './scrollTop.js';
import newTask from './newTask.js';
import Todo from './Todo.js';

const tasksContainer = document.querySelector('.tasks__content');

const dataView = (filter) => Todo.getAll(filter).forEach(({ id, title, description, isDone }) => {
  const li = newTask(title, description, id, isDone);
  tasksContainer.prepend(li);
  li.addEventListener('click', onClick);
  li.querySelector('.task__remove').addEventListener('click', onRemove);
});

const newTaskForm = document.querySelector('.new-task');
const uppenButton = document.querySelector('.uppen-button');
const newTaskButton = document.querySelector('.tabs > button');
const tabs = document.querySelectorAll('.tab');
const select = document.querySelector('.select');
const tasks = document.querySelectorAll('.task');
const tasksRemove = document.querySelectorAll('.task__remove');

const onSelect = ({ target }) => {
  const { id, value } = target;
  const isDone = id === 'completed' || value === 'completed';
  tasksContainer.innerHTML = '';
  dataView(id === 'all' || value === 'all' ? 'all' : isDone);
};

const onClick = ({ target }) => {
    const { id } = target;
    Todo.updateTask(id);
    target.classList.toggle('done');
};

const onRemove = ({ target }) => {
  const { id } = target.parentElement;
  Todo.removeTask(id);
  target.parentElement.remove();
};

const onSubmit = (e) => {
  e.preventDefault();

  const formElements = [...newTaskForm.querySelectorAll('.form-control')];

  const { title, description } = formElements.reduce((acc, element) => {
    const { id, value } = element;
    const feedback = element.nextElementSibling;
    if (value.length < 3) {
      feedback.classList.add('invalid');
      return acc;
    }
    feedback.classList.remove('invalid');
    acc[id] = value;
    return acc;
  }, {});

  if (title && description) {
      if (window.screen.width > 768) {
  tabs.forEach((tab) => {
      if (tab.type !== 'button' && tab.value === 'active') {
          tab.ckecked = true;
      }
  })
} else {
    select.querySelector('option[selected]').removeAttribute('selected');
    select.querySelector('option[value=active]').setAttribute('selected', true);
    select.dispatchEvent(new Event('change'));
}
    const tasksContainer = document.querySelector('.tasks__content');
    const id = Todo.addTask({ title, description, isDone: false });
    const li = newTask(title, description, id);
    tasksContainer.prepend(li);
    li.addEventListener('click', onClick);
    li.querySelector('.task__remove').addEventListener('click', onRemove);
    newTaskForm.reset();
    closeModal();
    scrollTop();
  }
};

newTaskButton.addEventListener('click', openModal);
uppenButton.addEventListener('click', scrollTop);
window.addEventListener('scroll', () => onScroll(uppenButton));
newTaskForm.addEventListener('submit', onSubmit);
if (window.screen.width > 768) {
  tabs.forEach((tab) => (tab.type !== 'button' ? tab.addEventListener('change', onSelect) : null));
} else {
    select.addEventListener('change', onSelect);
}

dataView();
