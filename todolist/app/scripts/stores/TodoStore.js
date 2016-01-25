var TodoActions = require('actions/TodoActions.js');
var createStore = require('redux').createStore;
var todoApp = require('reducers/TodoListReducer.js');

var store = createStore(todoApp);

store.dispatch(TodoActions.addTodo("Task 1"));
store.dispatch(TodoActions.addTodo("Task 2"));
store.dispatch(TodoActions.addTodo("Task 3"));

store.dispatch(TodoActions.completeTodo(1));

store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

module.exports = store;
