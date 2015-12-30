var Dispatcher = require('AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var _todoList = [
  {
    id: 0,
    name: 'Make todo list on flux + react'
  },
  {
    id: 1,
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et tortor non lectus lacinia gravida sit amet non enim. Donec fringilla lacus in tortor consectetur eleifend. In ultricies, tortor ac.'
  }
];

var TodoStore = merge.recursive(true, EventEmitter.prototype, {
  getTodoList: function() {
    return _todoList;
  },

  emitChangeList: function() {
    this.emit('todolist.change');
  },

  addChangeListListener: function(callback) {
    this.on('todolist.change', callback);
  },

  removeChangeListListener: function(callback) {
    this.removeListener('todolist.change', callback);
  }
});

Dispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  // switch(action.actionType) {
  //
  // }

  TodoStore.emitChangeList();
  return true;
});


module.exports = TodoStore;
