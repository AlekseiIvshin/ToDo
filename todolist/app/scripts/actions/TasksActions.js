var Dispatcher = require('dispatcher/AppDispatcher.js');
var TasksConstants = require('constants/TasksConstants.js');

var TasksActions = {
  changeStatus: function(taskId, newStatus) {
    Dispatcher.handleAction({
      actionType: TasksConstants.CHANGE_STATUS,
      data: {
        taskId: taskId,
        newStatus: newStatus
      }
    })
  },

  updateTask: function(updatedTask) {
    Dispatcher.handleAction({
      actionType: TasksConstants.UPDATE_TASK,
      data: {
        updates: updatedTask
      }
    })
  },

  addTask: function(newTask) {
    Dispatcher.handleAction({
      actionType: TasksConstants.ADD_TASK,
      data: {
        newTask: newTask
      }
    })
  }
}

module.exports = TasksActions;
