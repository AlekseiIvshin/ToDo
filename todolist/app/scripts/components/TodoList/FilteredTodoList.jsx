var React = require('react');
var List = require('List.jsx');
var TodoItem = require('TodoItem.jsx');
var _ = require('lodash');

var FilteredTodoList = React.createClass({

  filterList: function(event) {
    var filterValue = event.target.value.toLowerCase();
    var filteredList = this.state.items.filter(function (item) {
      return item.toLowerCase().search(filterValue) != -1;
    });
    this.setState({
      items: filteredList
    })
  },

  getInitialState: function() {
    return {
      items: []
    };
  },

  render: function() {
    return (
      <div className="e-filter-list">
        <input type="search" placeholder="Search" onChange={_.debounce(this.filterList, 1000)} />
        <List items={this.state.items} />
      </div>
    )
  }
});

module.exports = FilteredTodoList;
