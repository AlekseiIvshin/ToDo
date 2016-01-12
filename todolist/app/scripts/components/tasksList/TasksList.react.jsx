var React = require('react');
var List = require('List.react.jsx');
var TaskItem = require('TaskItem.react.jsx');
var Loading = require('Loading.react.js');
var Link = require('react-router').Link;

var debounce = require('lodash').debounce;

var TasksStore = require('stores/TasksStore.js');

var TasksList = React.createClass({

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

    var tasks = [];
    for (var key in this.state.taskList) {
      tasks.push(<TaskItem key={key} task={this.state.taskList[key]}/>);
    }
    var taskListView;
    if (this.state.loaded) {
      taskListView = <List items={tasks} />
    } else {
      taskListView = <Loading />
    }

    return (
      <div>
        <Link to='/task/new' className='e-new-task'>
          <span className='e-font-icon'>&#xf2c7;</span>Add task
        </Link>
        <input type="search" placeholder="Search" onChange={debounce(this._refreshList, 1000)} className="e-filter" id="filterField" defaultValue={this.state.filterValue} />
        {taskListView}
      </div>
    )
  },

  _onCreateTaskClick: function() {
    this.context.transitionTo('/task/new');
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

module.exports = TasksList;
