const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const toDosWrapper = document.querySelector('.todos-wrapper');

const date = document.getElementById('date');
const currentDate = new Date();

date.innerHTML = currentDate;

let tasks;
!localStorage.tasks ? tasks =[] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description){
	this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
  <div class="todo-item ${task.completed ? "checked" : ''}">
      <div class="description">${task.description}</div>
      <div class="buttons">
        <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
        <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
      </div>
    </div>
    `
    //add onclick, в фцию completeTask прокидываем index, чтобы получать индекс таски на которой
    //ставим галочку checked
}

const fillHtmlList = () => {
  toDosWrapper.innerHTML = "";
  if (tasks.length > 0) {
    tasks.forEach((item, index) => {
      toDosWrapper.innerHTML += createTemplate(item, index); //+=добавить результат предыдущей итерации
    });
    todoItemElems = document.querySelectorAll('.todo-item');
  }
}

fillHtmlList();

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

const completeTask = index => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add('checked');
  } else {
    todoItemElems[index].classList.remove('checked');
  }
  updateLocal();
  fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
	tasks.push(new Task(deskTaskInput.value));
  updateLocal();
  fillHtmlList();
  deskTaskInput.value = ''; // очищаем поле ввода после введения первой задачи
})

const deleteTask = index => {
  todoItemElems[index].classList.add('deletion');
  setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
  }, 500)
}

 