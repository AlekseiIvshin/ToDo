var Dispatcher = require('dispatcher/AppDispatcher.js');
var TasksConstants = require('constants/TasksConstants.js');

var TodoActions = function(){};

TodoActions.ADD_TODO = 'ADD_TODO';
TodoActions.COMPLETE_TODO = 'COMPLETE_TODO';
TodoActions.SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

TodoActions.VISIBILITY_FILTERS = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

TodoActions.addTodo = function (text) {
  return {
    type: TodoActions.ADD_TODO,
    text: text
  }
};

TodoActions.completeTodo = function(index) {
  return {
    type: TodoActions.COMPLETE_TODO,
    index: index
  }
};

TodoActions.setVisibilityFilter = function(filter) {
  return {
    type: TodoActions.SET_VISIBILITY_FILTER,
    filter: filter
  }
};

module.exports = TodoActions;
