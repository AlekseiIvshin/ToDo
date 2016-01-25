var React = require('react');
var PropTypes = React.PropTypes;
var List = require('List.react.jsx');
var TaskItem = require('TaskItem.react.jsx');
var Loading = require('Loading.react.js');
var AddTodo = require('AddTodo.jsx');
var Link = require('react-router').Link;

var debounce = require('lodash').debounce;

var connect = require('react-redux').connect;
var TodoActions = require('actions/TodoActions.js');
var VisibilityFilters = TodoActions.VISIBILITY_FILTERS;

var TasksList = React.createClass({

  propTypes: {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,

    visibilityFilter: PropTypes.oneOf([
      'SHOW_ALL',
      'SHOW_COMPLETED',
      'SHOW_ACTIVE'
    ]).isRequired
  },

  render: function() {
    var dispatch = this.props.dispatch;
    var visibleTodos = this.props.visibleTodos;
    var visibilityFilter = this.props.visibilityFilter;

    var tasks = [];
    for (var key in visibleTodos) {
      tasks.push(<TaskItem key={key} task={visibleTodos[key]}/>);
    }

    return (
      <div className='e-task-list'>
        <div className='e-task-list__header e-header'>
          <div className="e-header__item">
            <AddTodo onAddClick={function(text) {
                dispatch(TodoActions.addTodo(text));
              }}/>
          </div>
        </div>
        <div className='e-task-list__list'>
          <List items={tasks} />
        </div>
      </div>
    )
  },

  _onCreateTaskClick: function() {
    this.context.transitionTo('/task/new');
  }
});

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(function (todo) { return todo.completed});
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(function (todo) { return !todo.completed});
  }
}

function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

module.exports = connect(select)(TasksList);
