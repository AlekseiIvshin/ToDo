var React = require('react');
var FilteredTasksList = require('FilteredTasksList.react.jsx');
var Link = require('react-router').Link;

var TasksList = React.createClass({
  _onCreateTaskClick: function() {
    this.context.transitionTo('/task/new');
  },

  render: function() {
    return (
      <div>
        <Link to='/task/new' className='e-new-task'>
          <span className='e-font-icon'>&#xf2c7;</span>Add task
        </Link>
        <FilteredTasksList />
      </div>
    )
  }
});

module.exports = TasksList;
