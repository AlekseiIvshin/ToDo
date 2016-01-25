var React = require('react');
var PropTypes = React.PropTypes;

var AddTodo = React.createClass({
  propTypes: {
    onAddClick: PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div>
        <input type="text" ref="input" />
        <div onClick={this.handleAddTodo}>
          <span className='e-font-icon'>&#xf2c7;</span>
          <span>Add task</span>
        </div>
      </div>
    )
  },

  handleAddTodo() {
    var inputField = this.refs.input;
    var text = inputField.value.trim();
    this.props.onAddClick(text);
    inputField.value = '';
  }
});

module.exports = AddTodo;
