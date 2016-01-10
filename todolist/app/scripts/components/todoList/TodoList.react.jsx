var React = require('react');
var FilteredTodoList = require('FilteredTodoList.react.jsx');
var Link = require('react-router').Link;

var TodoList = React.createClass({
  _onCreateTaskClick: function() {
    this.context.transitionTo('/task/new');
  },

  render: function() {
    return (
      <div>
        <div>
          <Link to='/task/new'>Add task</Link>
        </div>
        <FilteredTodoList />
      </div>
    )
  }
});

module.exports = TodoList;
