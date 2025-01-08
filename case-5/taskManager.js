const fs = require('fs');
const path = require('path');

class Task {
  constructor(title, isCompleted = false) {
    this.title = title;
    this.isCompleted = isCompleted;
  }

  markCompleted() {
    this.isCompleted = true;
  }
}

class TaskList {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  addTask(title) {
    const newTask = new Task(title);
    this.tasks.push(newTask);
    console.log(`Задача "${title}" успешно добавлена.`);
  }

  removeTask(index) {
    if (index < 0 || index >= this.tasks.length) {
      console.log('Неверный индекс задачи.');
      return;
    }
    const removed = this.tasks.splice(index, 1);
    console.log(`Задача "${removed[0].title}" успешно удалена.`);
  }

  completeTask(index) {
    if (index < 0 || index >= this.tasks.length) {
      console.log('Неверный индекс задачи.');
      return;
    }
    this.tasks[index].markCompleted();
    console.log(`Задача "${this.tasks[index].title}" отмечена как выполненная.`);
  }

  listTasks() {
    if (this.tasks.length === 0) {
      console.log('Список задач пуст.');
      return;
    }
    console.log('Список задач:');
    this.tasks.forEach((task, idx) => {
      const status = task.isCompleted ? '[Выполнено]' : '[Не выполнено]';
      console.log(`${idx}. ${status} ${task.title}`);
    });
  }

  listCompletedTasks() {
    const completed = this.tasks.filter(task => task.isCompleted);
    if (completed.length === 0) {
      console.log('Нет выполненных задач.');
      return;
    }
    console.log('Список выполненных задач:');
    completed.forEach((task, idx) => {
      console.log(`${idx}. ${task.title}`);
    });
  }

  saveToFile(fileName = 'tasks.json') {
    const filePath = path.join(__dirname, fileName);
    const data = JSON.stringify(this.tasks, null, 2);
    fs.writeFileSync(filePath, data, 'utf-8');
    console.log(`Список задач успешно сохранён в файл "${fileName}".`);
  }

  loadFromFile(fileName = 'tasks.json') {
    const filePath = path.join(__dirname, fileName);

    if (!fs.existsSync(filePath)) {
      console.log('Файл со списком задач не найден. Создаём пустой список.');
      this.tasks = [];
      return;
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(data);

    // Преобразуем объекты в экземпляры класса Task
    this.tasks = parsedData.map(taskData => new Task(taskData.title, taskData.isCompleted));
    console.log(`Список задач успешно загружен из файла "${fileName}".`);
  }
}

module.exports = TaskList;
