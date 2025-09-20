// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add new task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  addTaskToDOM(task);
  saveTask(task);

  taskInput.value = "";
}

// Add task to UI
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.className =
    "flex justify-between items-center bg-gray-50 px-3 py-2 rounded-xl shadow";

  // Task text
  const span = document.createElement("span");
  span.textContent = task.text;
  span.className = task.completed
    ? "line-through text-gray-500"
    : "text-gray-800";

  // Buttons
  const btns = document.createElement("div");

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = task.completed ? "Undo" : "Done";
  toggleBtn.className =
    "px-2 py-1 text-sm rounded-lg mr-2 " +
    (task.completed
      ? "bg-yellow-500 text-white hover:bg-yellow-600"
      : "bg-green-500 text-white hover:bg-green-600");

  toggleBtn.addEventListener("click", () => {
    task.completed = !task.completed;
    updateTask(task);
    renderTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className =
    "px-2 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600";

  deleteBtn.addEventListener("click", () => {
    deleteTask(task.id);
    renderTasks();
  });

  btns.appendChild(toggleBtn);
  btns.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btns);

  taskList.appendChild(li);
}

// Save to localStorage
function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  renderTasks();
}

// Get tasks
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  const tasks = getTasks();
  tasks.forEach((task) => addTaskToDOM(task));
}

// Update task (toggle complete)
function updateTask(updatedTask) {
  const tasks = getTasks().map((t) =>
    t.id === updatedTask.id ? updatedTask : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task
function deleteTask(id) {
  const tasks = getTasks().filter((t) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}