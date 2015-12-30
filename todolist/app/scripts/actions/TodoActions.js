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
  }
}

module.exports = TodoActions;
