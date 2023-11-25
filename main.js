let toDoList = [];
let focusPoint;

function addNote() {
  const taskBox = document.getElementById("taskBox");
  const timeBox = document.getElementById("timeBox");

  taskBox.style.backgroundColor = "";
  timeBox.style.backgroundColor = "";

  task = taskBox.value;
  time = timeBox.value;

    if (!task) {
      taskBox.style.backgroundColor = "pink";
      showModal();
      printError(0);
      focusPoint = 0;
      event.preventDefault();
      return;
    }
    if (!time) {
      timeBox.style.backgroundColor = "pink";
      showModal();
      printError(1);
      focusPoint = 1;
      event.preventDefault();
      return;
    }

    const now = Date.now();
    if (new Date(time) < now) {
      timeBox.style.backgroundColor = "pink";
      showModal();
      printError(2);
      focusPoint = 2;
      event.preventDefault();
      return;
    }

  const todo = { task, time };
  toDoList.push(todo);

  saveToStorage();

  displayToDoList();
  animateLast();

  taskBox.value = "";
  timeBox.value = "";

  event.preventDefault();
}

function displayToDoList() {
  const container = document.getElementById("container");
  container.innerHTML = "";
  for (let i = 0; i < toDoList.length; i++) {
    const time = new Date(toDoList[i].time);
    container.innerHTML += `
    
<div onmouseleave="removeXButton('${i}')" onmouseenter="displayXButton('${i}')" id= 'note ${i}'  class="note ${i}">
    <div>${toDoList[i].task}</div>
    <div>${time.toLocaleDateString("en-GB")}</div>
    <div> ${time.toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })}</div>
    
    <button id='${i}' class='hidden' onclick="deleteMe(${i})"><img src="assets/imgs/x.png"></button>
  </div>
    `;
  }
}

function displayXButton(index) {
  const button = document.getElementById(index);
  button.classList.remove("hidden");
}
function removeXButton(index) {
  const button = document.getElementById(index);
  button.classList.add("hidden");
}

// utility functions
function saveToStorage() {
  const json = JSON.stringify(toDoList);
  localStorage.setItem("toDoList", json);
}
function loadToStorage() {
  const json = localStorage.getItem("toDoList");
  toDoList = json ? JSON.parse(json) : [];
}
function loadToDoList() {
  loadToStorage();
  displayToDoList();
}
function deleteMe(index) {
  const deletedNote = document.getElementById(`note ${index}`);
  deletedNote.style.animation = "remove-note 550ms ease-in";
  setTimeout(() => {
    toDoList.splice(index, 1);
    saveToStorage();

    displayToDoList();
  }, 500);
}
function animateLast() {
  const lastNote = document.getElementById(`note ${toDoList.length - 1}`);
  lastNote.style.animation = "add-note 550ms ease-out";
}
function getRandomNumInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function showModal() {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.classList.remove("hidden");
  const errorContainer = document.getElementById("errorContainer");
  errorContainer.classList.remove("hidden");
  const modalButton = document.getElementById("modalButton");
  modalButton.classList.remove("hidden");
}
function printError(errorIndex) {
  const errorContainer = document.getElementById("errorContainer");
  switch (errorIndex) {
    case 0:
      errorContainer.innerText = "Please enter your note.";
      break;
    case 1:
      errorContainer.innerText = "Please provide a due date.";
      break;
    case 2:
      errorContainer.innerText = "Please provide a valid (future) due date.";
      break;
  }
}
function closeModal() {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.classList.add("hidden");
  const errorContainer = document.getElementById("errorContainer");
  errorContainer.classList.add("hidden");
  const modalButton = document.getElementById("modalButton");
  modalButton.classList.add("hidden");

  const taskBox = document.getElementById("taskBox");
  const timeBox = document.getElementById("timeBox");

  switch (focusPoint) {
    case 0:
      taskBox.focus();
      break;
    case 1:
      timeBox.focus();
      break;
    case 2:
      timeBox.focus();
      break;
  }
}
