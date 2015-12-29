var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var App = require('AppRoot.jsx');

ReactDOM.render((
  <Router>
    <Route path="/" component={App} />
  </Router>
), document.querySelector('#content'));
