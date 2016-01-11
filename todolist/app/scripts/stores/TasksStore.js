var Dispatcher = require('dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var TasksConstants = require('constants/TasksConstants.js');
var merge = require('merge');
var _ = require('lodash');

var $ = require('jquery');
var q = require('q');

var baseUrl = 'http://localhost:3000/task';

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


function addTask(newTask) {
  var deferred = q.defer();
  $.ajax({
    method: 'POST',
    data: newTask,
    url: baseUrl,
    dataType: 'json'})
  .then(
    function(data){
      deferred.resolve(data)
    },
    function(err) {
      deferred.reject(err)
    });

  return deferred.promise;
}

function updateTask(taskUpdates) {
  var deferred = q.defer();
  $.ajax({
    method: 'PUT',
    data: taskUpdates,
    url: baseUrl + '/' + taskUpdates.id,
    dataType: 'json'})
  .then(
    function(data){
      deferred.resolve(data)
    },
    function(err) {
      deferred.reject(err)
    });

  return deferred.promise;
}

var TasksStore = merge.recursive(true, EventEmitter.prototype, {

  getTasksList: function() {
    var deferred = q.defer();
    $.ajax({
      url: baseUrl,
      dataType: 'json'})
    .then(
      function(data){
        deferred.resolve(data)
      },
      function(err) {
        deferred.reject(err)
      });

    return deferred.promise;
  },

  filter: function(filterByName) {
    var deferred = q.defer();
    $.ajax({
      url: baseUrl + '/filter?&name=' + filterByName,
      dataType: 'json'})
    .then(
      function(data){
        deferred.resolve(data)
      },
      function(err) {
        deferred.reject(err)
      });

    return deferred.promise;
  },

  getTaskById: function(taskId) {
    var deferred = q.defer();
    $.ajax({
      url: baseUrl + '/' + taskId,
      dataType: 'json'})
    .then(
      function(data){
        deferred.resolve(data)
      },
      function(err) {
        deferred.reject(err)
      });

    return deferred.promise;
  },


  emitChangeList: function() {
    this.emit('changeList');
  },

  addChangeListListener: function(callback) {
    this.on('changeList', callback);
  },

  removeChangeListListener: function(callback) {
    this.removeListener('changeList', callback);
  },

  emitTaskListLoaded: function() {
    this.emit('tasksLoaded');
  },

  addTaskListLoadedListener: function(callback) {
    this.on('tasksLoaded', callback);
  },

  removeTaskListLoadedListener: function(callback) {
    this.removeListener('tasksLoaded', callback);
  },

  emitChangeTask: function() {
    this.emit('changeTask');
  },

  addChangeTaskListener: function(callback) {
    this.on('changeTask', callback);
  },

  removeChangeTaskListener: function(callback) {
    this.removeListener('changeTask', callback);
  }
});

Dispatcher.register( function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case TasksConstants.UPDATE_TASK:
      updateTask(action.data.updates)
        .then(function() {
          TasksStore.emitChangeTask();
          TasksStore.emitChangeList();
        });
      break;
    case TasksConstants.ADD_TASK:
      addTask(action.data.newTask)
        .then(function(){
          TasksStore.emitChangeTask();
          TasksStore.emitChangeList();
        });
      break;
    default:
      return true;
  }

  return true;
});


module.exports = TasksStore;
