var React = require('react');
var List = require('List.react.jsx');
var TodoItem = require('TodoItem.react.jsx');
var _ = require('lodash');

var TodoStore = require('stores/TodoStore.js');

function getAppState() {
  return {
    todoList: TodoStore.getTodoList()
  }
}

function filterList(todosList, filterValue) {
  return _.filter(todosList, function (item) {
    return item.name.toLowerCase().search(filterValue) != -1;
  });
}

var FilteredTodoList = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    TodoStore.addChangeListListener(this._onChangeList);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListListener(this._onChangeList);
  },

  render: function() {
    var allTodos = this.state.todoList;
    var todos = [];
    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]}/>);
    }

    return (
      <div>
        <input type="search" placeholder="Search" onChange={_.debounce(this._onFilterList, 1000)} className="e-filter" id="filterField" />
        <List items={todos} />
      </div>
    )
  },

  _onChangeList: function() {
    var filterField = document.querySelector('#filterField');
    if(filterField.value && filterField.value != '') {
      this.setState({
        todoList: filterList(getAppState().todoList, filterField.value.toLowerCase())
      })
    } else {
      this.setState(getAppState());
    }
  },

  _onFilterList: function(event) {
    var filterValue = event.target.value.toLowerCase();
    var filteredList = this.getInitialState().todoList.filter(function (item) {
      return item.name.toLowerCase().search(filterValue) != -1;
    });
    this.setState({
      todoList: filteredList
    })
  }
});

module.exports = FilteredTodoList;
