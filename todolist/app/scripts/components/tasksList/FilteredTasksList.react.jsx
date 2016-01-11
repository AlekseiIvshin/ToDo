var React = require('react');
var List = require('List.react.jsx');
var TaskItem = require('TaskItem.react.jsx');
var Loading = require('Loading.react.js');

var TasksStore = require('stores/TasksStore.js');

var debounce = require('lodash').debounce;

var FilteredTasksList = React.createClass({

  getInitialState: function() {
    return {
      taskList: [],
      loaded: false
    }
  },

  componentDidMount: function() {
    TasksStore.addChangeListListener(this._refreshList);
    this._refreshList();
  },

  componentWillUnmount: function() {
    TasksStore.removeChangeListListener(this._refreshList);
  },

  render: function() {
    var allTasks = this.state.taskList;
    var tasks = [];
    for (var key in allTasks) {
      tasks.push(<TaskItem key={key} task={allTasks[key]}/>);
    }
    var taskListView;
    if (this.state.loaded) {
      taskListView = <List items={tasks} />
    } else {
      taskListView = <Loading />
    }
    return (
      <div>
        <input type="search" placeholder="Search" onChange={debounce(this._refreshList, 1000)} className="e-filter" id="filterField" defaultValue={this.state.filterValue} />
        {taskListView}
      </div>
    )
  },

  _refreshList: function() {
    var filterByName = document.querySelector('#filterField').value;
    if (filterByName && filterByName.length > 0) {
      this.setState({
        loaded: false
      });
      TasksStore.filter(filterByName).then((function (data) {
        this.setState({
          filterValue: data.filterValue,
          taskList: data.taskList,
          loaded: true
        });
      }).bind(this));
    } else {
      TasksStore.getTasksList().then((function (data) {
        this.setState({
          filterValue: '',
          taskList: data.taskList,
          loaded: true
        });
      }).bind(this));
    }
  }

});

module.exports = FilteredTasksList;
