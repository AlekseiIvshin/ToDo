var React = require('react');
var TodoStore = require('stores/TodoStore.js');
var Link = require('react-router').Link;
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

  render: function() {
    var toolbarTitle;
    var actionTitle;
    var action;
    if (this.props.route.mode === 'new') {
      toolbarTitle = 'New task';
      actionTitle = 'Save';
      action = this._onCreateTask;
    } else {
      toolbarTitle = 'Edit task';
      actionTitle = 'Edit';
      action = this._onUpdateTask;
    }
    return (
      <div className='e-todo-form'>
        <Toolbar title={toolbarTitle} navIcon='&#xf124;' navTitle='Back' actionTitle={actionTitle} onActionClick={action} />
        <div className='e-todo-form__item e-form-item'>
          <span className='e-form-item__label'>Name</span>
          <input type='text' id='todoName' defaultValue={this.state.todo.name} />
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
  }
});

module.exports = TodoForm;
