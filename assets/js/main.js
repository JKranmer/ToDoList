const inputTask = document.querySelector(".input-task");
const btnTask = document.querySelector(".btn-task");
const tasks = document.querySelector(".tasks");
const dark = document.querySelector('#is-dark');

const newLi = () => document.createElement('li')

function newTask(t) {
  const li = newLi();
  li.innerText = t
  tasks.appendChild(li)
  empityInput()
  btnDelete(li)
  saveTask()
}

function empityInput() {
  inputTask.value = '';
  inputTask.focus();
}

function btnDelete(li) {
  li.innerText += ' ';
  const elDelete = document.createElement('button');
  elDelete.innerText = 'x';
  elDelete.setAttribute('class', 'apagar');
  elDelete.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(elDelete);
}

function saveTask() {
  const liTask = tasks.querySelectorAll('li');
  const listTasks = [];
  for (let task of liTask) {
    let text = task.innerText;
    text = text.replace('x', '').trim();
    listTasks.push(text);
  }

  const tasksJSON = JSON.stringify(listTasks);
  localStorage.setItem('tasks', tasksJSON);
  localStorage.setItem('dark', document.querySelector('#is-dark').checked);
}

function addTasksSaved() {
  if(localStorage.getItem('dark') === 'true') {
    document.body.classList.add('dark')
    dark.setAttribute('checked', 'true')
  }
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for( let t of tasks) {
    newTask(t)
  }
}

btnTask.addEventListener("click", (e) => {
  if(!inputTask.value) return;
  newTask(inputTask.value)
});

inputTask.addEventListener('keypress', (e)=> {
  if(!inputTask.value) return;
  if(e.keyCode===13)
    newTask(inputTask.value)
})

document.addEventListener('click', (e) => {
  const el = e.target;
  if(el.classList.contains('apagar')) {
    el.parentElement.remove();
    saveTask()
  }
})
dark.addEventListener('change', (e)=> {
  const bodyClassList = document.body.classList;
      for (const iterator of bodyClassList) {
      if(iterator === 'dark') {
        bodyClassList.remove('dark')
        saveTask()
        return
      }
    }
    bodyClassList.add('dark')
    saveTask()
})

addTasksSaved()
