class Todo {
  constructor(data = []) {
    this.data = data;
  }

  getAll(filter = 'all') {
    if (filter === 'all') {
      return this.data;
    }
    return this.getOnlyFor(filter);
  }
  
  getOnlyFor(isDone) {
    return this.data.filter((task) => isDone ? task.isDone : !task.isDone);
  }

  getTask(id) {
    return this.getAll().find((task) => task.id === Number(id));
  }

  addTask(task) {
    const nextId = Math.max(0, ...this.getAll().map((task) => task.id)) + 1;
    this.getAll().push({ ...task, id: nextId });
    window.localStorage.setItem('myTasks', JSON.stringify(this.getAll()));
    return nextId;
  }

  removeTask(id) {
    const newTasks = this.getAll().filter((task) => task.id !== Number(id));
    this.data = newTasks;
    return window.localStorage.setItem('myTasks', JSON.stringify(newTasks));
  }
  
  updateTask(id) {
      const newTasks = this.getAll().map((task) => {
          if (task.id === Number(id)) {
              task.isDone = !task.isDone;
              return task;
          }
          return task;
      });
    this.data = newTasks;
    return window.localStorage.setItem('myTasks', JSON.stringify(newTasks));
  }
}

const savedTask = window.localStorage.getItem('myTasks');

export default new Todo(savedTask && savedTask !== [] ? JSON.parse(savedTask) : []);
