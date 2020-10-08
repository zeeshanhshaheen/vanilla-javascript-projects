// define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventisteners();

function loadEventisteners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearAll);
    // clearBtn.addEventListener('click', clearTasks);
    // filter tasks
    filter.addEventListener('keyup', filterTasks);

}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        // append li to UI
        // console.log(li);
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add input');
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    // append li to UI
    // console.log(li);
    taskList.appendChild(li);
    // store in Local Storage
    storeInLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}

function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        // console.log(e.target);
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from local storage
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function clearfromLocalStorage() {
    localStorage.clear();
}

function clearAll() {
    // taskList.innerHTML = '';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearfromLocalStorage();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}