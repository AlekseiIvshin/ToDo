var React = require('react');
var FilteredTodoList = require('FilteredTodoList.react.jsx');

var TodoList = React.createClass({
  render: function() {
    return (
      <div>
        <FilteredTodoList />
      </div>
    )
  }
});

module.exports = TodoList;
