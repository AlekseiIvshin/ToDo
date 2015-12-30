var React = require('react');

var TodoItem = React.createClass({
  changeCheck: function(element) {
    this.setState({
      checked: element.checked
    });
  },

  getInitialState: function() {
    return {
      checked: false
    }
  },

  render: function() {
    return (
      <div className='e-list__item'>
        <input className='e-list__item-selector' type='checkbox' id={this.props.todoId} onClick={this.changeCheck}/>
        <span className='e-list__item-name'>{this.props.name}</span>
        <span className='e-list__item-edit' onClick={this.editTodo}>Edit</span>
      </div>
    )
  }
});

module.exports = TodoItem;
