var _ = require('lodash');

var _tasksList = [
  {
    id: 0,
    text: 'Make todo list on flux + react',
    completed: null
  },
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tortor non lectus lacinia gravida sit amet non enim. Donec fringilla lacus in tortor consectetur eleifend. In ultricies, tortor ac.',
    completed: null
  },
  {
    id: 2,
    text: 'Task 3',
    completed: null
  }
];

function generateId() {
  return _tasksList.length + 1;
}


var TasksService = function() {};

TasksService.updateTask = function (taskUpdates) {
  var task = TasksService.getTaskById(taskUpdates.id);
  if(!task) {
    return {
      success: false,
      message: 'Task was not found (id = ' + taskUpdates.id + ')'
    }
  }
  if(taskUpdates.hasOwnProperty('text')) {
    task.text = taskUpdates.text;
  }
  if(taskUpdates.hasOwnProperty('completed')) {
    task.completed = taskUpdates.completed;
  }
  return {
    success: true,
    message: 'Task updated'
  }
}

TasksService.addTask = function (newTask) {
  var taskId = generateId();
  _tasksList.push({
    id: taskId,
    text: newTask.text
  });
}

TasksService.getTaskById = function (taskId) {
  return _.find(_tasksList, function(item) {
    return item.id == taskId;
  });
}

TasksService.getTasksList = function () {
  return _tasksList;
}

TasksService.getFilteredTaskList = function(filterByText) {
  var preparedFilterText = filterByText.toLowerCase();
  return _.filter(_tasksList, function(item) {
    return item.text.toLowerCase().search(preparedFilterText) != -1;
  });
}

module.exports = TasksService;
