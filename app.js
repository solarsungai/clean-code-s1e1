//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// DOM elements
var taskInput = document.getElementById('new-task');
var addButton = document.getElementById('add-btn');
var incompleteTaskHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');

// Create new task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement('li');
   listItem.className = 'task-list__item';

  var checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'task__checkbox';

  var label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'task__label';

  var editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task__input';

  var editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'btn btn--edit';

  var deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn--delete';

  var deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'btn__ico';
  deleteButtonImg.alt = 'Remove task';
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

// Add new task
var addTask = function() {
  console.log('Add Task...');
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
};

//Edit task
var editTask = function() {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var editBtn = listItem.querySelector('.btn--edit');
  var isEditing = listItem.classList.contains('task-list__item--edit-mode');

  if (isEditing) {
    if (editInput.value.trim() === '') {
      editInput.value = label.innerText;
    } else {
      label.innerText = editInput.value;
    }
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('task-list__item--edit-mode');
};

//Close edit mode automatically
var closeEditMode = function(listItem) {
  if (listItem.classList.contains('task-list__item--edit-mode')) {
    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector('label');
    var editBtn = listItem.querySelector('.btn--edit');
    
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
    listItem.classList.remove('task-list__item--edit-mode');
  }
};

//Delete task
var deleteTask = function() {
  console.log('Delete Task...');
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

//Mark task as completed
var taskCompleted = function() {
  console.log('Complete Task...');
  var listItem = this.parentNode;
  closeEditMode(listItem);
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark task as incomplete
var taskIncomplete = function() {
  console.log('Incomplete Task...');
  var listItem = this.parentNode;
  closeEditMode(listItem);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// AJAX handler
var ajaxRequest = function() {
  console.log('AJAX Request');
};

// Add new task event
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

// Bind events to a task
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('Bind list item events');

  var checkBox = taskListItem.querySelector('.task__checkbox');
  var editButton = taskListItem.querySelector('.btn--edit');
  var deleteButton = taskListItem.querySelector('.btn--delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

// Initialize event bindings for existing tasks
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}