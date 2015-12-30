var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var TodoList = require('TodoList.jsx');

ReactDOM.render((
  <Router>
    <Route path="/" component={TodoList} />
  </Router>
), document.querySelector('#mount-point'));
