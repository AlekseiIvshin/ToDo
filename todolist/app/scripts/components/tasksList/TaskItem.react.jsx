var React = require('react');
var Link = require('react-router').Link;

var TaskItem = React.createClass({
  changeStatus: function(element) {
    var newStatus = element.target.checked ? 'done' : null;
  },

  getInitialState: function() {
    return {
      checked: false
    }
  },

  render: function() {
    if(this.props.task.status && this.props.task.status === 'done') {
      return (
        <div className='e-list__item'>
          <input className='e-list__item-selector' type='checkbox' id={this.props.task.id} onChange={this.changeStatus} checked />
          <span className='e-list__item-name e-list__item-name--done'>{this.props.task.text}</span>
          <span className='e-list__item-edit e-list__item-edit--unactive'>Edit</span>
        </div>
      )
    } else {
      return (
        <div className='e-list__item'>
          <input className='e-list__item-selector' type='checkbox' id={this.props.task.id} onChange={this.changeStatus} />
          <span className='e-list__item-name'>{this.props.task.text}</span>
          <Link to={'/task/edit/' + this.props.task.id } className='e-list__item-edit'>Edit</Link>
        </div>
      )
    }
  }
});

module.exports = TaskItem;
