const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// Load stored data when page opens
window.onload = loadTasks;

function addTask() {
  if (inputBox.value === "") return;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onclick = updateStatus;

  const label = document.createElement("label");
  label.textContent = inputBox.value;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = function () {
    let updatedText = prompt("Edit task:", label.textContent);
    if (updatedText) {
      label.textContent = updatedText;
      saveTasks();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    li.remove();
    saveTasks();
  };

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  listContainer.appendChild(li);
  inputBox.value = "";

  saveTasks();
}

function updateStatus() {
  const li = this.parentElement;
  if (this.checked) {
    li.classList.add("completed");
  } else {
    li.classList.remove("completed");
  }
  saveTasks();
}

function updateCounters() {
  const tasks = listContainer.children;
  let completed = 0;

  for (let task of tasks) {
    if (task.classList.contains("completed")) {
      completed++;
    }
  }

  completedCounter.textContent = completed;
  uncompletedCounter.textContent = tasks.length - completed;
}

// Save list to storage
function saveTasks() {
  localStorage.setItem("tasks", listContainer.innerHTML);
  updateCounters();
}

// Load tasks from storage
function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    listContainer.innerHTML = data;

    // Reconnect button + checkbox events (important!)
    const checkboxes = listContainer.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.onclick = updateStatus);

    const editBtns = listContainer.querySelectorAll(".edit-btn");
    editBtns.forEach(btn => btn.onclick = function () {
      const label = this.previousSibling;
      let updatedText = prompt("Edit task:", label.textContent);
      if (updatedText) {
        label.textContent = updatedText;
        saveTasks();
      }
    });

    const deleteBtns = listContainer.querySelectorAll(".delete-btn");
    deleteBtns.forEach(btn => btn.onclick = function () {
      this.parentElement.remove();
      saveTasks();
    });

    updateCounters();
  }
}
