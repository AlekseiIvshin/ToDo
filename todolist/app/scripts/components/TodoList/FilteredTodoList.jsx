var React = require('react');
var List = require('List.jsx');
var TodoItem = require('TodoItem.jsx');
var _ = require('lodash');

var TodoStore = require('stores/TodoStore.js');

function getAppState() {
  return {
    todoList: TodoStore.getTodoList()
  }
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
      todos.push(<TodoItem key={key} name={allTodos[key].name} todoId={allTodos[key].id}/>);
    }

    return (
      <div>
        <input type="search" placeholder="Search" onChange={_.debounce(this._filterList, 1000)} className="e-filter" />
        <List items={todos} />
      </div>
    )
  },

  _onChangeList: function() {
    this.setState(getAppState());
  },

  _filterList: function(event) {
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
