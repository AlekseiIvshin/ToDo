var React = require('react');
var Toolbar = require('Toolbar.react.jsx');
var TasksActions = require('actions/TasksActions.js');
var Loading = require('Loading.react.js');

var TasksStore = require('stores/TasksStore.js');

function alertDismissed() {
  window.location.hash = '/';
}

var TaskForm = React.createClass({
  getInitialState: function() {
    return {
      task: {
        name: ''
      },
      loaded: this.props.route.mode != 'edit'
    }
  },

  componentDidMount: function() {
    TasksStore.addChangeTaskListener(this._onChangeTask);
    if (this.props.route.mode == 'edit') {
      TasksStore.getTaskById(this.props.params.taskId).then((function(data){
        this.setState({
          task: data.task,
          loaded: true
        })
      }).bind(this));
    }
  },

  componentWillUnmount: function() {
    TasksStore.removeChangeTaskListener(this._onChangeTask);
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

    var formView;
    if (this.state.loaded) {
      formView = <div className='e-task-form'>
        <div  className='e-task-form__label'>
          <span>Name:</span>
        </div>
        <div  className='e-task-form__value'>
        <input className='e-task-form__field' type='text' id='taskName' defaultValue={this.state.task.name} />
        </div>
      </div>
    } else {
      formView = <Loading />
    }

    return (
      <div>
        <Toolbar title={toolbarTitle} navIcon='&#xf124;' navTitle='Back' actionTitle='Save' onActionClick={action} />
        {formView}
      </div>
    )

  },

  _onUpdateTask: function() {
    var taskNameElement = document.querySelector('#taskName');
    TasksActions.updateTask({
      id: this.props.params.taskId,
      name: taskNameElement.value
    });
  },

  _onCreateTask: function() {
    var taskNameElement = document.querySelector('#taskName');
    TasksActions.addTask({
      name: taskNameElement.value
    });
  },

  _onChangeTask: function() {
    navigator.notification.alert(
      'Task successfully saved!',
      alertDismissed,
      'Task changes',
      'OK'
    );
  }
});

module.exports = TaskForm;
