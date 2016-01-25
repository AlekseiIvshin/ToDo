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
          id: action.id,
          text: action.text,
          completed: false
         });
     case TodoActions.COMPLETE_TODO:
       return todos.slice(0, action.id).concat(
           Object.assign({}, todos[action.id], {
             completed: true
           }),
           todos.slice(action.id + 1)
         );
     case TodoActions.REOPEN_TODO:
       return todos.slice(0, action.id).concat(
           Object.assign({}, todos[action.id], {
             completed: false
           }),
           todos.slice(action.id + 1)
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
