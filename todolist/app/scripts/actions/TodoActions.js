var fetch = require('isomorphic-fetch');
var $ = require('jquery');
var q = require('q');

var TodoActions = function(){};

TodoActions.SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';


TodoActions.VISIBILITY_FILTERS = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

var baseUrl = 'http://10.27.11.73:3000/task';


TodoActions.setVisibilityFilter = function(filter) {
  return {
    type: TodoActions.SET_VISIBILITY_FILTER,
    filter: filter
  }
};

TodoActions.FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
TodoActions.requestTodos = function(filter) {
  return {
    type: TodoActions.FETCH_TODOS_REQUEST,
    filter: filter
  }
};

TodoActions.FETCH_TODOS_RECEIVE = 'FETCH_TODOS_RECEIVE';
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
};

TodoActions.ADD_TODO = 'ADD_TODO';
TodoActions.addTodo = function(text) {
  return function(dispatch) {
    dispatch(TodoActions.addTodo(text))

    var deferred = q.defer();
    $.ajax({
      method: 'POST',
      data: newTask,
      url: baseUrl,
      dataType: 'json'})
    .then(
      function(response){
        dispatch(TodoActions.addTodoResult(response));
        dispatch(TodoActions.fetchTodos());
      },
      function(err) {
        deferred.reject(err)
      });

    return deferred.promise;
  }
};

TodoActions.ADD_TODO_RESULT = 'ADD_TODO_RESULT';
TodoActions.addTodoResult = function(response) {
  return {
    type: TodoActions.ADD_TODO_RESULT,
    response: response
  }
};

TodoActions.COMPLETE_TODO = 'COMPLETE_TODO';
TodoActions.completeTodo = function(id) {
  var taskUpdates = {
    id: id,
    completed: true
  };

  return function(dispatch) {
    dispatch(TodoActions.completeTodo(id))

    var deferred = q.defer();
    $.ajax({
      method: 'PUT',
    data: taskUpdates,
    url: baseUrl + '/' + taskUpdates.id,
    dataType: 'json'})
    .then(
      function(response){
        dispatch(TodoActions.comleteTodoResult(response));
        dispatch(TodoActions.fetchTodos());
      },
      function(err) {
        deferred.reject(err)
      });

    return deferred.promise;
  }
};

TodoActions.COMPLETE_TODO_RESULT = 'COMPLETE_TODO_RESULT';
TodoActions.comleteTodoResult = function(response) {
  return {
    type: TodoActions.COMPLETE_TODO_RESULT,
    response: response
  }
};

TodoActions.REOPEN_TODO = 'REOPEN_TODO';
TodoActions.reopenTodo = function(id) {
  var taskUpdates = {
    id: id,
    completed: false
  };

  return function(dispatch) {
    dispatch(TodoActions.reopenTodo(text))

    var deferred = q.defer();
    $.ajax({
      method: 'PUT',
    data: taskUpdates,
    url: baseUrl + '/' + taskUpdates.id,
    dataType: 'json'})
    .then(
      function(response){
        dispatch(TodoActions.comleteTodoResult(response));
        dispatch(TodoActions.fetchTodos());
      },
      function(err) {
        deferred.reject(err)
      });

    return deferred.promise;
  }
};

TodoActions.REOPEN_TODO_RESULT = 'REOPEN_TODO_RESULT';
TodoActions.reopenTodoResult = function(response) {
  return {
    type: TodoActions.REOPEN_TODO_RESULT,
    response: response
  }
};


module.exports = TodoActions;
