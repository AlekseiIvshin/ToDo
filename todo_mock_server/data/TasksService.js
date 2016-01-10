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
  var task = getTaskById(taskUpdates.id);
  task.name = taskUpdates.name;
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

module.exports = TasksService;
