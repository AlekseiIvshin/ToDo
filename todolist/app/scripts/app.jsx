var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var TasksList = require('TasksList.react.jsx');

var TodoActions = require('actions/TodoActions.js');
var createStore = require('redux').createStore;
var Provider = require('react-redux').Provider;
var todoApp = require('reducers/TodoListReducer.js');

var store = createStore(todoApp);

ReactDOM.render(
  <Provider store={store}>
    <TasksList />
  </Provider>,
  document.querySelector('#mount-point'));


  // <Provider store={store}>
  //   <Router>
  //     <Route path="/" component={TasksList}/>
  //   </Router>
  // </Provider>
