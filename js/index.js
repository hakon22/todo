/* eslint-disable no-new */
import '../scss/app.scss';
import { openModal, closeModal } from './modal.js';
import scrollTop, { onScroll } from './scrollTop.js';
import newTask from './newTask.js';
import Todo from './Todo.js';

const tasksContainer = document.querySelector('.tasks__content');

Todo.getAll().forEach(({ id, title, description }) => {
  const li = newTask(title, description, id);
  tasksContainer.prepend(li);
});

const newTaskForm = document.querySelector('.new-task');
const uppenButton = document.querySelector('.uppen-button');
const newTaskButton = document.querySelector('.tabs > button');
const tabs = document.querySelectorAll('.tab');
const tasks = document.querySelectorAll('.task');
const tasksRemove = document.querySelectorAll('.task__remove');

const onSelect = ({ target }) => {
  const { id } = target;
  if (id === 'all') {
    return console.log('all');
  } if (id === 'active') {
    return console.log('active');
  }
  return console.log('completed');
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
    const tasksContainer = document.querySelector('.tasks__content');
    const id = Todo.addTask({ title, description });
    const li = newTask(title, description, id);
    tasksContainer.prepend(li);
    newTaskForm.reset();
    closeModal();
    scrollTop();
  }
};

newTaskButton.addEventListener('click', openModal);
uppenButton.addEventListener('click', scrollTop);
window.addEventListener('scroll', () => onScroll(uppenButton));
newTaskForm.addEventListener('submit', onSubmit);
tabs.forEach((tab) => (tab.type !== 'button' ? tab.addEventListener('change', onSelect) : null));
tasksRemove.forEach((removeButton) => removeButton.addEventListener('click', onRemove));
