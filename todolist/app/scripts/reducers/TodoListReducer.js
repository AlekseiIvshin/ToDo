var TodoActions = require('actions/TodoActions.js');
var objectAssign = require('object-assign')
var combineReducers = require('redux').combineReducers;

var initialState = {
  visibilityFilter: 'SHOW_ALL',
  todos: [],
  isFetching: false
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

function todosUpdates(todos, action){
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

  function todosFetching(state, action){
    if (typeof state === 'undefined') {
      state = initialState;
    }

    switch (action.type) {
      case TodoActions.FETCH_TODOS_REQUEST:
        return Object.assign({}, state, {
          isFetching: true
        });
       case TodoActions.FETCH_TODOS_RECEIVE:
         return Object.assign({}, state, {
           isFetching: false,
           todos: action.todos,
           lastUpdated: action.receivedAt
         });
      default:
        return state;
    }
}

var tasksApp = combineReducers({
  visibilityFilter,
  todosUpdates,
  todosFetching
});

module.exports = tasksApp;
