const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks(filter = "all") {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        const li = document.createElement("li");
        li.textContent = task.name;
        if (task.completed) li.classList.add("completed");

        li.addEventListener("click", () => toggleComplete(index));

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(index);
        });

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskName = taskInput.value.trim();
    if (!taskName) return;
    tasks.push({ name: taskName, completed: false });
    taskInput.value = "";
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(filter) {
    displayTasks(filter);
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

displayTasks();
