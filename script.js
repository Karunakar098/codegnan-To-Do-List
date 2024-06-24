// JavaScript code

// Get the menu icon element
const menuIcon = document.getElementById('menu-icon');

// Function to toggle the menu
function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');
}

// Event listener for menu icon click
menuIcon.addEventListener('click', toggleMenu);


// Initial form values and task list
let formValues = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'low',
  status: 'not-completed'
};

let tasks = [];
let isEditing = null;
let editIndex = null;

// Function to handle input changes in the form
function handleInputChange(event) {
  const { name, value } = event.target;
  formValues[name] = value;
}

// Function to add a new task
function addTask() {
  const taskForm = document.getElementById('task-form');
  const taskTitle = taskForm.elements['task-title'].value.trim();
  const taskDescription = taskForm.elements['description'].value.trim();
  const taskDueDate = taskForm.elements['due-date'].value.trim(); // Fix: Use 'due-date' instead of 'task-dueDate'

  if (taskTitle !== '') {
    formValues.title = taskTitle;
    formValues.description = taskDescription;
    formValues.dueDate = taskDueDate; // Update formValues with the due date

    tasks.push({...formValues});
    resetForm();
    renderTasks();
  } else {
    alert('Task title is required!');
  }
}

// Function to reset the form after adding a task
function resetForm() {
  formValues.title = '';
  formValues.description = '';
  formValues.dueDate = '';
  formValues.priority = 'low';
  formValues.status = 'not-completed';
  document.getElementById('task-form').reset();
}

// Function to delete a task by index
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to edit a task by index
function editTask(index) {
  isEditing = true;
  editIndex = index;
  // Load task data into formValues for editing
  formValues = {...tasks[index]};
  renderTasks();
}

// Function to save an edited task
function saveTask() {
  tasks[editIndex] = {...formValues}; // Update the task in tasks array
  isEditing = false;
  editIndex = null;
  resetForm();
  renderTasks();
}

// Function to cancel editing
function cancelEdit() {
  isEditing = false;
  editIndex = null;
  resetForm();
  renderTasks();
}

// Function to toggle visibility of the task list
function toggleTaskList() {
  const taskList = document.getElementById('task-list');
  if (taskList.style.display === 'none' || taskList.style.display === '') {
    taskList.style.display = 'block';
    renderTasks();
  } else {
    taskList.style.display = 'none';
  }
}

// Function to render the task list
function renderTasks() {
  const taskListElement = document.getElementById('task-list');
  taskListElement.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItemElement = document.createElement('div');
    taskItemElement.className = 'task-item';

    if (isEditing && editIndex === index) {
      // Create edit form
      const editForm = document.createElement('form');
      editForm.innerHTML = `
        <label for="edit-task-title">Task Title:</label><br>
        <input type="text" id="edit-task-title" name="title" value="${task.title}" required><br>
        
        <label for="edit-description">Description:</label><br>
        <input type="text" id="edit-description" name="description" value="${task.description}"><br>
        
        <label for="edit-due-date">Due Date:</label><br>
        <input type="date" id="edit-due-date" name="dueDate" value="${task.dueDate}"><br>
        
        <label for="edit-priority">Priority:</label><br>
        <select id="edit-priority" name="priority">
          <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
          <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
        </select><br>
        
        <label for="edit-status">Status:</label><br>
        <select id="edit-status" name="status">
          <option value="not-completed" ${task.status === 'not-completed' ? 'selected' : ''}>Not Completed</option>
          <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
        </select><br>
        
        <button type="button" onclick="saveTask()">Save</button>
        <button type="button" onclick="cancelEdit()">Cancel</button>
      `;

      editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        saveTask();
      });

      taskItemElement.appendChild(editForm);
    } else {
      // Create task details view
      taskItemElement.innerHTML = `
        <span><strong>Title:</strong> ${task.title}</span><br>
        <span><strong>Description:</strong> ${task.description}</span><br>
        <span><strong>Due Date:</strong> ${task.dueDate}</span><br>
        <span><strong>Priority:</strong> ${task.priority}</span><br>
        <span><strong>Status:</strong> ${task.status}</span><br>
        <button type="button" onclick="editTask(${index})">Edit</button>
        <button type="button" onclick="deleteTask(${index})">Delete</button>
      `;
    }

    taskListElement.appendChild(taskItemElement);
  });
}

// Initial render of tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});

  