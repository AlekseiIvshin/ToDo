var _ = require('lodash');

var _tasksList = [
  {
    id: 0,
    name: 'Make todo list on flux + react',
    status: null
  },
  {
    id: 1,
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tortor non lectus lacinia gravida sit amet non enim. Donec fringilla lacus in tortor consectetur eleifend. In ultricies, tortor ac.',
    status: null
  },
  {
    id: 2,
    name: 'Task 3',
    status: null
  }
];

function generateId() {
  return _tasksList.length + 1;
}


var TasksService = function() {};

TasksService.changeStatus = function(todoId, newStatus) {
  var todoItem = _.find(_tasksList, function(item) {
    return item.id == todoId;
  });
  todoItem.status = newStatus;
}

TasksService.updateTask = function (taskUpdates) {
  var task = TasksService.getTaskById(taskUpdates.id);
  if(!task) {
    return {
      success: false,
      message: 'Task was not found (id = ' + taskUpdates.id + ')'
    }
  }
  if(taskUpdates.hasOwnProperty('name')) {
    task.name = taskUpdates.name;
  }
  if(taskUpdates.hasOwnProperty('status')) {
    task.status = taskUpdates.status;
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
    name: newTask.name
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

TasksService.getFilteredTaskList = function(filterByName) {
  var preparedFilterName = filterByName.toLowerCase();
  return _.filter(_tasksList, function(item) {
    return item.name.toLowerCase().search(preparedFilterName) != -1;
  });
}

module.exports = TasksService;
