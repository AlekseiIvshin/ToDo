var React = require('react');
var TodoActions = require('actions/TodoActions.js');
var Link = require('react-router').Link;

var TodoItem = React.createClass({
  changeStatus: function(element) {
    var newStatus = element.target.checked ? 'done' : null;
    TodoActions.changeStatus(element.target.id, newStatus);
  },

  getInitialState: function() {
    return {
      checked: false
    }
  },

  render: function() {
    if(this.props.todo.status && this.props.todo.status === 'done') {
      return (
        <div className='e-list__item'>
          <input className='e-list__item-selector' type='checkbox' id={this.props.todo.id} onChange={this.changeStatus} checked />
          <span className='e-list__item-name e-list__item-name--done'>{this.props.todo.name}</span>
          <span className='e-list__item-edit'></span>
        </div>
      )
    } else {
      return (
        <div className='e-list__item'>
          <input className='e-list__item-selector' type='checkbox' id={this.props.todo.id} onChange={this.changeStatus} />
          <span className='e-list__item-name'>{this.props.todo.name}</span>
          <Link to={'/task/' + this.props.todo.id + '/edit'}>Edit</Link>
        </div>
      )
    }
  }
});

module.exports = TodoItem;
