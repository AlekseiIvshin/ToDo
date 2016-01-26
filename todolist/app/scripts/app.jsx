var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var createStore = require('redux').createStore;
var thunkMiddleware =require('redux-thunk');
var applyMiddleware = require('redux').applyMiddleware;
var Provider = require('react-redux').Provider;

var TodoActions = require('actions/TodoActions.js');
var rootReducer = require('reducers/TodoListReducer.js');

var TasksList = require('TasksList.react.jsx');
var TaskEdit = require('TaskEdit.jsx');


var createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

var store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <Route path="/" component={TasksList} />
        <Route path="/edit/:id" component={TaskEdit} />
      </Router>
  </Provider>,
  document.querySelector('#mount-point'));


  // <Provider store={store}>
  //   <Router>
  //     <Route path="/" component={TasksList}/>
  //   </Router>
  // </Provider>
