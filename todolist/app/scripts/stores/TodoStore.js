var Dispatcher = require('dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('constants/TodosConstants.js');
var merge = require('merge');
var _ = require('lodash');

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

function changeStatus(todoId, newStatus) {
  var todoItem = _.find(_todoList, function(item) {
    return item.id == todoId;
  });
  todoItem.status = newStatus;
}

var TodoStore = merge.recursive(true, EventEmitter.prototype, {
  getTodoList: function() {
    return _todoList;
  },

  getTaskById: function(taskId) {
    return _.find(_todoList, function(item) {
      return item.id == taskId;
    });
  },

  emitChangeList: function() {
    this.emit('change');
  },

  addChangeListListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListListener: function(callback) {
    this.removeListener('change', callback);
  }
});

Dispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case TodoConstants.CHANGE_STATUS:
      changeStatus(action.data.todoId, action.data.newStatus);
      break;
    default:
      return true;
  }

  TodoStore.emitChangeList();
  return true;
});


module.exports = TodoStore;
