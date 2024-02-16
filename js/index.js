/* eslint-disable no-new */
import '../scss/app.scss';
import { openModal, closeModal } from './modal.js';
import scrollTop, { onScroll } from './scrollTop.js';
import newTask from './newTask.js';
import Todo from './Todo.js';

// вытягиваем элементы с DOM-дерева
const tasksContainer = document.querySelector('.tasks__content');
const newTaskForm = document.querySelector('.new-task');
const uppenButton = document.querySelector('.uppen-button');
const newTaskButton = document.querySelector('.tabs > button');
const tabs = document.querySelectorAll('.tab');
const select = document.querySelector('.select');

// при нажатии на таск делаем его выполненным
const onClick = ({ target }) => {
  const { id } = target;
  Todo.updateTask(id);
  target.classList.toggle('done');
};

// удаляем таск
const onRemove = ({ target }) => {
  const { id } = target.parentElement;
  Todo.removeTask(id);
  target.parentElement.remove();
};

// главная функция, отвечающая за отображение тасков и навешивание на них слушателей
const dataView = (filter) => Todo.getAll(filter).forEach(({
  id, title, description, isDone,
}) => {
  const li = newTask(title, description, id, isDone);
  tasksContainer.prepend(li);
  li.addEventListener('click', onClick);
  li.querySelector('.task__remove').addEventListener('click', onRemove);
});

const changeFlag = (id = 'active') => {
  if (window.screen.width > 767) { // нативная валидация на isMobile
    // на ПК при добавлении нового таска ставим "ckecked" на радиокнопку активных задач
    document.querySelector('input[checked]').removeAttribute('checked');
    const activeButton = document.querySelector(`input[id=${id}]`);
    activeButton.setAttribute('checked', true);
  } else {
    // на телефонах при добавлении нового таска ставим "selected" на select
    select.querySelector('option[selected]').removeAttribute('selected');
    select.querySelector(`option[value=${id}]`).setAttribute('selected', true);
    console.log(select.querySelector(`option[value=${id}]`));
  }
  const isDone = id === 'completed';
  tasksContainer.innerHTML = '';
  // отображаем только те элементы, которые подходят под текущий "фильтр"
  dataView(id === 'all' ? 'all' : isDone);
};

// обрабатываем только переключения вкладок самостоятельно
const onSelect = (e) => {
  const { id, value } = e.target;
  if (e.isTrusted) {
    changeFlag(window.screen.width > 767 ? id : value);
  }
};

// добавляем новый таск
const onSubmit = (e) => {
  e.preventDefault();

  const formElements = [...newTaskForm.querySelectorAll('.form-control')];

  // собираем объект с пришедшими данными
  const { title, description } = formElements.reduce((acc, element) => {
    const { id, value } = element;
    // нативная валидация на количество символов
    const feedback = element.nextElementSibling;
    if (value.length < 3) {
      feedback.classList.add('invalid');
      return acc;
    }
    feedback.classList.remove('invalid');
    acc[id] = value;
    return acc;
  }, {});

  if (title && description) { // если прошли валидацию
    changeFlag(); // меняем активную вкладку на "active"
    // вытаскиваем свежий контейнер с задачами
    const tasksContainer = document.querySelector('.tasks__content');
    // добавляем его в "хранилище" и получаем его id
    const id = Todo.addTask({ title, description, isDone: false });
    // собираем <li> с необходимой информацией и атрибутами
    const li = newTask(title, description, id);
    // добавляем его в DOM-дерево, вешаем обработчики и прокручиваем пользователя к началу
    tasksContainer.prepend(li);
    li.addEventListener('click', onClick);
    li.querySelector('.task__remove').addEventListener('click', onRemove);
    newTaskForm.reset();
    closeModal();
    scrollTop();
  }
};

// вешаем обработчики
newTaskButton.addEventListener('click', openModal);
uppenButton.addEventListener('click', scrollTop);
window.addEventListener('scroll', () => onScroll(uppenButton));
newTaskForm.addEventListener('submit', onSubmit);
// в зависимости от ширины экрана вешаем обработчик либо на <input>, либо на <select>
if (window.screen.width > 767) {
  tabs.forEach((tab) => (tab.type !== 'button' ? tab.addEventListener('change', onSelect) : null));
} else {
  select.addEventListener('change', onSelect);
}

// запускаем отображение сохранённых тасков при входе
dataView();
