var Dispatcher = require('dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('constants/TodosConstants.js');
var merge = require('merge');
var _ = require('lodash');
var TasksService = require('services/TasksService.js');

var _todoList = [
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
  return _todoList.length + 1;
}

function changeStatus(todoId, newStatus) {
  var todoItem = _.find(_todoList, function(item) {
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
  _todoList.push({
    id: taskId,
    name: newTask.name
  });
}

function getTaskById(taskId) {
  return _.find(_todoList, function(item) {
    return item.id == taskId;
  });
}

var TodoStore = merge.recursive(true, EventEmitter.prototype, {
  getTodoList: function() {
    return TasksService.getTasksList()
      .then();
  },

  getTaskById: function(taskId) {
    return getTaskById(taskId);
  },

  emitChangeList: function() {
    this.emit('changeList');
  },

  addChangeListListener: function(callback) {
    this.on('changeList', callback);
  },

  removeChangeListListener: function(callback) {
    this.removeListener('changeList', callback);
  },

  emitTaskListLoaded: function() {
    this.emit('tasksLoaded');
  },

  addTaskListLoadedListener: function(callback) {
    this.on('tasksLoaded', callback);
  },

  removeTaskListLoadedListener: function(callback) {
    this.removeListener('tasksLoaded', callback);
  },

  emitChangeTask: function() {
    this.emit('changeTask');
  },

  addChangeTaskListener: function(callback) {
    this.on('changeTask', callback);
  },

  removeChangeTaskListener: function(callback) {
    this.removeListener('changeTask', callback);
  }
});

Dispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case TodoConstants.CHANGE_STATUS:
      changeStatus(action.data.todoId, action.data.newStatus);
      TodoStore.emitChangeList();
      break;
    case TodoConstants.UPDATE_TASK:
      updateTask(action.data.updates);
      TodoStore.emitChangeTask();
      break;
    case TodoConstants.ADD_TASK:
      addTask(action.data.newTask);
      TodoStore.emitChangeTask();
      break;
    default:
      return true;
  }

  return true;
});


module.exports = TodoStore;
