var TasksService = require('./../data/TasksService.js');

function changeStatus(todoId, newStatus) {
  var taskItem = _.find(_tasksList, function(item) {
    return item.id == todoId;
  });
  todoItem.status = newStatus;
}

function updateTask(req, res) {
  var taskUpdates = req.body;
  console.log('Update task');
  res.send({
    result: TasksService.updateTask(taskUpdates)
  });
}

function addTask(req, res) {
  var newTask = req.body;
  console.log('Add task: ' + newTask);
  TasksService.addTask(newTask);
  res.send({
    result: 'success'
  });
}

function getTaskById(req, res) {
  console.log('Get task by id = ' + req.params.id);
  res.send({
    task: TasksService.getTaskById(req.params.id)
  });
}

function getTasksList(req, res) {
  console.log('Get tasks list');
  res.send({
    taskList: TasksService.getTasksList()
  });
}

function getFilteredTaskList(req, res) {
  var filterByName = req.query.name;
  console.log('Filter task list filter: name LIKE ' + filterByName);
  res.send({
    filterValue: filterByName,
    taskList: TasksService.getFilteredTaskList(filterByName)
  });
}

var TasksRoutes = function (app) {
  app.get('/task', getTasksList);
  app.get('/task/filter', getFilteredTaskList);
  app.get('/task/:id', getTaskById);
  app.post('/task', addTask);
  app.put('/task/:id', updateTask);
}

module.exports = TasksRoutes;
