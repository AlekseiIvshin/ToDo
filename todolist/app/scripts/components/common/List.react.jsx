var React = require('react');

var List = React.createClass({
  render: function() {
    return (
      <ul className="e-list">
        {
          this.props.items.map(function(item) {
            return <li key={item.key} >{item}</li>
          })
        }
      </ul>
    );
  }
});

module.exports = List;
