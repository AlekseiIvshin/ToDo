var React = require('react');
var Link = require('react-router').Link;

var Toolbar = React.createClass({

  render: function() {
    return (
      <div className='e-toolbar'>
        <div className='e-toolbar__item'>
          <Link to={'/'}>
            <span className="e-font-icon">&#xf124;</span>
            <span>Back</span>
          </Link>
        </div>
        <div className='e-toolbar__item'><span>{this.props.title}</span></div>
        <div className='e-toolbar__item' onClick={this.props.onActionClick}>
          <span>{this.props.actionTitle}</span>
        </div>
      </div>);
  }
});

module.exports = Toolbar;
