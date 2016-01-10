var $ = require('jquery');
var q = require('q');

var baseUrl = 'http://localhost:3000/task';

var TaskService = function() {

};

TaskService.prototype.getTasksList = function() {
  var deferred = q.defer();
  $.ajax({
    url: baseUrl,
    dataType: 'json'})
  .then(
    function(data){
      deferred.resolve(data)
    },
    function(err) {
      deferred.reject(err)
    });

  return deferred.promise;
}

module.exports = new TaskService();
