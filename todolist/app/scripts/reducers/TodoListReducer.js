var TodoActions = require('actions/TodoActions.js');
var objectAssign = require('object-assign')
var combineReducers = require('redux').combineReducers;

var initialState = {
  visibilityFilter: 'SHOW_ALL',
  todos: []
}

function visibilityFilter(filter, action) {
  if(typeof filter === 'undefined') {
    filter = initialState.visibilityFilter;
  }

  switch (action.type) {
    case TodoActions.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return filter;
  }
}

function todos(todos, action){
  if (typeof todos === 'undefined') {
    todos = initialState.todos;
  }

  switch (action.type) {
    case TodoActions.ADD_TODO:
      return todos.concat({
           text: action.text,
           completed: false
         });
     case TodoActions.COMPLETE_TODO:
       return todos.slice(0, action.index).concat(
           Object.assign({}, todos[action.index], {
             completed: true
           }),
           todos.slice(action.index + 1)
         );
    default:
      return todos;
  }
}

var tasksApp = combineReducers({
  visibilityFilter,
  todos
});

module.exports = tasksApp;
