var Dispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _todoList = [];

var TodoStore = assign({}, EventEmitter.prototype, {
  
});


module.exports = new TodoStore();
