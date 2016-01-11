var React = require('react');

var Loading = React.createClass({
  render: function() {
    return (
      <div className='e-loading'>
        <span>Loading...</span>
      </div>
    )
  }
});

module.exports = Loading;
