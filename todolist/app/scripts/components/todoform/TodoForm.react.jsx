var React = require('react');
var TodoStore = require('stores/TodoStore.js');
var Toolbar = require('Toolbar.react.jsx');
var TodoActions = require('actions/TodoActions.js');

var TodoForm = React.createClass({
  getInitialState: function() {
    if (this.props.route.mode == 'edit') {
      return {
        todo: TodoStore.getTaskById(this.props.params.taskId)
      }
    } else {
      return {
        todo: {
          name: ''
        }
      }
    }
  },

  componentDidMount: function() {
    TodoStore.addChangeTaskListener(this._onChangeTask);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeTaskListener(this._onChangeTask);
  },

  render: function() {
    var toolbarTitle;
    var action;
    if (this.props.route.mode === 'new') {
      toolbarTitle = 'New task';
      action = this._onCreateTask;
    } else {
      toolbarTitle = 'Edit task';
      action = this._onUpdateTask;
    }
    return (
      <div>
        <Toolbar title={toolbarTitle} navIcon='&#xf124;' navTitle='Back' actionTitle='Save' onActionClick={action} />
        <div className='e-task-form'>
          <div  className='e-task-form__label'>
            <span>Name:</span>
          </div>
          <div  className='e-task-form__value'>
          <input className='e-task-form__field' type='text' id='todoName' defaultValue={this.state.todo.name} />
          </div>
        </div>
      </div>
    )
  },

  _onUpdateTask: function() {
    var todoNameElement = document.querySelector('#todoName');
    TodoActions.updateTask({
      id: this.props.params.taskId,
      name: todoNameElement.value
    });
  },

  _onCreateTask: function() {
    var todoNameElement = document.querySelector('#todoName');
    TodoActions.addTask({
      name: todoNameElement.value
    });
  },

  _onChangeTask: function() {
    window.location.hash = '/';
  }
});

module.exports = TodoForm;
