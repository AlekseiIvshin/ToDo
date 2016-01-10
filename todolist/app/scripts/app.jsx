var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var TodoList = require('TodoList.react.jsx');
var TodoForm = require('TodoForm.react.jsx');

ReactDOM.render((
  <Router>
    <Route path="/" component={TodoList} />
    <Route path="/task/edit/:taskId" component={TodoForm} mode='edit' />
    <Route path="/task/new" component={TodoForm}  mode='new' />
  </Router>
), document.querySelector('#mount-point'));
