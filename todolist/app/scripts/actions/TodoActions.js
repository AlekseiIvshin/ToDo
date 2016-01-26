var fetch = require('isomorphic-fetch');

var TodoActions = function(){};

TodoActions.ADD_TODO = 'ADD_TODO';
TodoActions.COMPLETE_TODO = 'COMPLETE_TODO';
TodoActions.REOPEN_TODO = 'REOPEN_TODO';
TodoActions.SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

TodoActions.FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
TodoActions.FETCH_TODOS_RECEIVE = 'FETCH_TODOS_RECEIVE';

TodoActions.VISIBILITY_FILTERS = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

var baseUrl = 'http://10.27.11.73:3000/task';

var nextTodoId = 0;

TodoActions.addTodo = function (text) {
  return {
    type: TodoActions.ADD_TODO,
    text: text,
    id: nextTodoId++
  }
};

TodoActions.completeTodo = function(id) {
  return {
    type: TodoActions.COMPLETE_TODO,
    id: id
  }
};

TodoActions.reopenTodo = function(id) {
  return {
    type: TodoActions.REOPEN_TODO,
    id: id
  }
};

TodoActions.setVisibilityFilter = function(filter) {
  return {
    type: TodoActions.SET_VISIBILITY_FILTER,
    filter: filter
  }
};

TodoActions.requestTodos = function(filter) {
  return {
    type: TodoActions.FETCH_TODOS_REQUEST,
    filter: filter
  }
};

TodoActions.receiveTodos = function(filter, json) {
  return {
    type: TodoActions.FETCH_TODOS_RECEIVE,
    filter: filter,
    todos: json.todos,
    receivedAt: Date.now()
  }
};

TodoActions.fetchTodos = function(filter) {
  return function(dispatch) {
    dispatch(TodoActions.requestTodos(filter));

    return fetch(baseUrl)
      .then(function(response){
        return response.json();
      })
      .then(function (json) {
        dispatch(TodoActions.receiveTodos(filter, json));
      }) ;
  }
}

module.exports = TodoActions;
