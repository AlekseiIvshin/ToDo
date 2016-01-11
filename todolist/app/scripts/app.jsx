var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var TasksList = require('TasksList.react.jsx');
var TaskForm = require('TaskForm.react.jsx');

ReactDOM.render((
  <Router>
    <Route path="/" component={TasksList} />
    <Route path="/task/edit/:taskId" component={TaskForm} mode='edit' />
    <Route path="/task/new" component={TaskForm}  mode='new' />
  </Router>
), document.querySelector('#mount-point'));
