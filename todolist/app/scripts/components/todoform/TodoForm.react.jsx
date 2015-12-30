var React = require('react');
var TodoStore = require('stores/TodoStore.js');
var Link = require('react-router').Link;

// TODO: move to other react class
function getToolbar(mode) {
  if(mode === 'new') {
    return (<div className='e-toolbar'>
      <div className='e-toolbar__item'>
        <Link to={'/'}>
          <span class="e-font-icon">&#xf124;</span>
          <span>Back</span>
        </Link>
      </div>
      <div className='e-toolbar__item'><span>New task</span></div>
      <div className='e-toolbar__item' onClick={this.createTask}>Save</div>
    </div>);
  } else {
    return (<div className='e-toolbar'>
      <div className='e-toolbar__item'>
        <Link to={'/'}>
          <span className="e-font-icon">&#xf124;</span>
          <span>Back</span>
        </Link>
      </div>
      <div className='e-toolbar__item'><span>Edit task</span></div>
      <div className='e-toolbar__item' onClick={this.updateTask}><span>Save</span></div>
    </div>);
  }
}

var TodoForm = React.createClass({

  getInitialState: function() {
    if (this.props.params.mode == 'edit') {
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
    return (
      <div className='e-todo-form'>
        {getToolbar(this.props.params.mode)}
        <div className='e-todo-form__item e-form-item'>
          <span className='e-form-item__label'>Name</span>
          <input type='text' id='todoName' defaultValue={this.state.todo.name} />
        </div>
      </div>
    )
  },

});

module.exports = TodoForm;
