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
      <div className='e-list_item' onClick={this.changeCheck}>
        <input type='checkbox'>{this.props.name}</input>
      </div>
    )
  }
});

module.exports = TodoItem;
