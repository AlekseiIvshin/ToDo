var React = require('react');

var TaskEdit = React.createClass({
  render: function() {
    return (
      <div>
        <input type='text' ref='taskText'/>
        <div>
          <span>Save</span>
        </div>
      </div>
    );
  }
});

module.exports = TaskEdit;
