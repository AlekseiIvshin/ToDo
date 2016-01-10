var React = require('react');
var Link = require('react-router').Link;

var Toolbar = React.createClass({

  render: function() {
    return (
      <div className='e-toolbar'>
        <div className='e-toolbar__item e-toolbar__item--nav'>
          <Link to={'/'}>
            <span className="e-font-icon">{this.props.navIcon}</span>
            <span>{this.props.navTitle}</span>
          </Link>
        </div>
        <div className='e-toolbar__item e-toolbar__item--title'><span>{this.props.title}</span></div>
        <div className='e-toolbar__item e-toolbar__item--action' onClick={this.props.onActionClick}>
          <span>{this.props.actionTitle}</span>
        </div>
      </div>);
  }
});

module.exports = Toolbar;
