$(document).ready(function() {
  const taskList = $('#taskList');

  function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      taskList.empty();
      tasks.forEach((task, index) => {
          const taskHtml = `
        <div class="task-item" data-index="${index}">
          <span class="task-text">${task}</span>
          <div class="task-actions">
            <button class="btn btn-sm btn-warning edit-task">Edit</button>
            <button class="btn btn-sm btn-danger delete-task">Delete</button>
          </div>
        </div>`;
          taskList.append(taskHtml);
          $('#noTaskMsg').toggle(tasks.length === 0);

      });
  }

  function saveTasks(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  $('#addTaskBtn').on('click', function() {
      const taskInput = $('#taskInput');
      const task = taskInput.val().trim();
      if (task) {
          const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
          tasks.push(task);
          saveTasks(tasks);
          taskInput.val('');
          loadTasks();
      }
  });

  taskList.on('click', '.delete-task', function() {
      const index = $(this).closest('.task-item').data('index');
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
  });

  taskList.on('click', '.edit-task', function() {
      const taskItem = $(this).closest('.task-item');
      const index = taskItem.data('index');
      const taskText = taskItem.find('.task-text');
      const originalText = taskText.text();
      const newText = prompt('Edit your task:', originalText);
      if (newText !== null && newText.trim() !== '') {
          let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
          tasks[index] = newText.trim();
          saveTasks(tasks);
          loadTasks();
      }
  });

  loadTasks();
});