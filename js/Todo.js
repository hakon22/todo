class Todo {
  constructor(data = []) {
    this.data = data;
  }

  /* метод получения задач по определённому фильтру
  ("all" - все задачи, "false" - активные, "true" - выполненные) */
  getAll(filter = 'all') {
    if (filter === 'all') {
      return this.data;
    }
    return this.getOnlyFor(filter);
  }

  // фильтр активных/выполненных задач
  getOnlyFor(isDone) {
    return this.data.filter((task) => (isDone ? task.isDone : !task.isDone));
  }

  // найти таск по id
  getTask(id) {
    return this.getAll().find((task) => task.id === Number(id));
  }

  /* добавление таска с генерацией нового id. Ищем максимальный текущий id в хранилище
  и добавляем к нему единицу */
  addTask(task) {
    const nextId = Math.max(0, ...this.getAll().map((task) => task.id)) + 1;
    this.getAll().push({ ...task, id: nextId });
    // переводим всё хранилище в строчный JSON и сохраняем в localStorage
    window.localStorage.setItem('myTasks', JSON.stringify(this.getAll()));
    return nextId;
  }

  // удаление таска
  removeTask(id) {
    const newTasks = this.getAll().filter((task) => task.id !== Number(id));
    this.data = newTasks;
    // обновляем хранилище
    return window.localStorage.setItem('myTasks', JSON.stringify(newTasks));
  }

  // обновление статуса таска с активного на выполненного и наоборот
  updateTask(id) {
    const newTasks = this.getAll().map((task) => {
      if (task.id === Number(id)) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    this.data = newTasks;
    return window.localStorage.setItem('myTasks', JSON.stringify(newTasks));
  }
}

// при запуске приложения проверяем на наличие тасков в localStorage
const savedTask = window.localStorage.getItem('myTasks');

// экспортируем уже запущенный класс либо с загруженными тасками, либо с пустым массивом
export default new Todo(savedTask && savedTask !== [] ? JSON.parse(savedTask) : []);
