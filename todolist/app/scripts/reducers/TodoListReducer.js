var TodoActions = require('actions/TodoActions.js');
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

function todosUpdates(state, action){
  if (typeof state === 'undefined') {
    state = initialState.todos;
  }

  switch (action.type) {
    case TodoActions.ADD_TODO:
      return Object.assign({}, state, {
        isAdding: true
      });
    case TodoActions.ADD_TODO_RESULT:
      return Object.assign({}, state, {
        isAdding: false,
        ADDING_RESULT: action.response
      });
    case TodoActions.COMPLETE_TODO:
      return Object.assign({}, state, {
        isCompliting: true
      });
    case TodoActions.COMPLETE_TODO_RESULT:
      return Object.assign({}, state, {
        isCompliting: false,
        COMPLETING_RESULT: action.response
      });
    case TodoActions.REOPEN_TODO:

    default:
      return state;
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
