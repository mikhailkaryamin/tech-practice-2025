const readline = require('readline');
const TaskList = require('./taskManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const taskList = new TaskList();

// При загрузке приложения попробуем загрузить задачи из файла
taskList.loadFromFile('tasks.json');

// Функция для отображения меню
function printMenu() {
  console.log('\nВыберите действие:');
  console.log('1. Добавить задачу');
  console.log('2. Удалить задачу');
  console.log('3. Отметить задачу как выполненную');
  console.log('4. Показать все задачи');
  console.log('5. Показать выполненные задачи');
  console.log('6. Сохранить задачи в файл');
  console.log('7. Выйти\n');
}

function handleUserInput(choice) {
  switch (choice.trim()) {
    case '1':
      rl.question('Введите название задачи: ', (title) => {
        taskList.addTask(title);
        printMenu();
      });
      break;

    case '2':
      rl.question('Введите индекс задачи для удаления: ', (index) => {
        taskList.removeTask(parseInt(index));
        printMenu();
      });
      break;

    case '3':
      rl.question('Введите индекс задачи для отметки как выполненной: ', (index) => {
        taskList.completeTask(parseInt(index));
        printMenu();
      });
      break;

    case '4':
      taskList.listTasks();
      printMenu();
      break;

    case '5':
      taskList.listCompletedTasks();
      printMenu();
      break;

    case '6':
      taskList.saveToFile('tasks.json');
      printMenu();
      break;

    case '7':
      console.log('Выход из приложения...');
      rl.close();
      break;

    default:
      console.log('Неверная команда. Попробуйте снова.');
      printMenu();
  }
}

// Запуск приложения
printMenu();
rl.on('line', (input) => {
  handleUserInput(input);
});
