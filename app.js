// DOM element caching
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.querySelector('#taskList');
const taskTemplate = document.getElementById('taskTemplate');
const taskCount = document.getElementById('taskCount');

// Event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', handleTaskAction);

// BOM methods
window.addEventListener('load', () => {
    alert('Welcome to the Task Manager!');
});

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
});

// Function to add a new task
function addTask(e) {
    e.preventDefault();
    
    // DOM-based form validation
    if (taskInput.value.trim().length < 3) {
        taskInput.setCustomValidity('Task must be at least 3 characters long');
        taskInput.reportValidity();
        return;
    } else {
        taskInput.setCustomValidity('');
    }

    const taskText = taskInput.value.trim();
    const taskElement = document.importNode(taskTemplate.content, true);
    
    taskElement.querySelector('.task-text').textContent = taskText;
    
    taskList.appendChild(taskElement);
    taskInput.value = '';
    
    updateTaskCount();
}

// Function to handle task actions (delete or complete)
function handleTaskAction(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('li').remove();
        updateTaskCount();
    } else if (e.target.classList.contains('complete-btn')) {
        const taskItem = e.target.closest('li');
        taskItem.classList.toggle('completed');
        e.target.textContent = taskItem.classList.contains('completed') ? 'Undo' : 'Complete';
    }
}

// Function to update task count
function updateTaskCount() {
    const tasks = taskList.children;
    taskCount.textContent = `Total tasks: ${tasks.length}`;
    
    // Iterate over tasks to change their appearance
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].style.backgroundColor = i % 2 === 0 ? '#f9f9f9' : '#ffffff';
    }
}

// Creating a new element
const footer = document.createElement('footer');
footer.innerHTML = '<p>Created by Your Name</p>';
document.body.appendChild(footer);

// Modifying element attributes
taskList.setAttribute('aria-live', 'polite');

// Using parent-child relationship
console.log('First task:', taskList.firstChild);
console.log('Last task:', taskList.lastChild);