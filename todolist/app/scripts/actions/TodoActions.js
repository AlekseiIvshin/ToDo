var Dispatcher = require('dispatcher/AppDispatcher.js');
var TodoConstants = require('constants/TodosConstants.js');

var TodoActions = {
  changeStatus: function(todoId, newStatus) {
    Dispatcher.handleAction({
      actionType: TodoConstants.CHANGE_STATUS,
      data: {
        todoId: todoId,
        newStatus: newStatus
      }
    })
  },

  updateTask: function(updatedTask) {
    Dispatcher.handleAction({
      actionType: TodoConstants.UPDATE_TASK,
      data: {
        updates: updatedTask
      }
    })
  },

  addTask: function(newTask) {
    Dispatcher.handleAction({
      actionType: TodoConstants.ADD_TASK,
      data: {
        newTask: newTask
      }
    })
  }
}

module.exports = TodoActions;
