var TasksService = require('./../data/TasksService.js');

function changeStatus(todoId, newStatus) {
  var taskItem = _.find(_tasksList, function(item) {
    return item.id == todoId;
  });
  todoItem.status = newStatus;
}

function updateTask(taskUpdates) {
  var task = getTaskById(taskUpdates.id);
  task.name = taskUpdates.name;
}

function addTask(newTask) {
  var taskId = generateId();
  _tasksList.push({
    id: taskId,
    name: newTask.name
  });
}

function getTaskById(taskId) {
  return _.find(_tasksList, function(item) {
    return item.id == taskId;
  });
}

function getTasksList(req, res) {
  res.send({
    taskList: TasksService.getTasksList()
  });
}

var TasksRoutes = function (app) {
  app.get('/task', getTasksList);
}

module.exports = TasksRoutes;
