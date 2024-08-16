// Retrieve todo from local storage or initialize an empty array
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
let todo = JSON.parse(localStorage.getItem("todo")) || [];

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default Enter key behavior
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  createDropdown();
  displayTasks();
  addHoverEffects();
  restrictInput();
});

function createDropdown() {
  const types = ['Groceries', 'Back to School', 'Vacation'];

  // Create a dropdown for to-do types
  const dropdown = document.createElement('select');
  dropdown.id = 'todoTypesDropdown';

  types.forEach((type) => {
    const option = document.createElement('option');
    option.value = type.toLowerCase().replace(/ /g, '-');
    option.textContent = type;
    dropdown.appendChild(option);
  });

  // Insert the dropdown before the input field
  const inputField = document.getElementById('todoInput');
  inputField.parentNode.insertBefore(dropdown, inputField);
}

function addTask() {
  const newTask = todoInput.value.trim();
  const dropdown = document.getElementById('todoTypesDropdown');
  const selectedType = dropdown.value;

  if (newTask !== "" && /^[a-zA-Z0-9\s]+$/.test(newTask)) {
    todo.push({ text: newTask, type: selectedType, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  } else {
    alert('Please enter only letters and numbers.');
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
        <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text} (${item.type})</p>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index));
    p.querySelector(".todo-container").addEventListener("mouseover", () => p.querySelector(".todo-container").style.fontWeight = "bold");
    p.querySelector(".todo-container").addEventListener("mouseout", () => p.querySelector(".todo-container").style.fontWeight = "normal");
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function addHoverEffects() {
  addButton.addEventListener("mouseover", () => addButton.style.transform = "scale(1.1)");
  addButton.addEventListener("mouseout", () => addButton.style.transform = "scale(1)");
}

function restrictInput() {
  todoInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
      alert('Please enter only letters and numbers.');
      e.target.value = value.replace(/[^a-zA-Z0-9\s]/g, '');
    }
  });
}

if (tasks.length === 0) {
  clearAllButton.setAttribute('disabled', 'true');
} else {
  clearAllButton.removeAttribute('disabled');
}
todoList.addEventListener('mouseover', showTaskOptions);
todoList.addEventListener('mouseout', hideTaskOptions);