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
      <div className='e-task-list'>
        <div className='e-task-list__header e-header'>
          <div className="e-header__item">
            <Link to='/task/new' className='e-new-task'>
              <span className='e-font-icon'>&#xf2c7;</span>Add task
            </Link>
          </div>
          <div className="e-header__item">
            <input type="search" placeholder="Search" onChange={debounce(this._refreshList, 1000)} id="filterField" className='e-filter' defaultValue={this.state.filterValue} />
          </div>
        </div>
        <div className='e-task-list__list'>
          {taskListView}
        </div>
      </div>
    )
  },

  _onCreateTaskClick: function() {
    this.context.transitionTo('/task/new');
  },

  _refreshList: function() {
    var filterByName = document.querySelector('#filterField').value;
    TasksStore.getTasksList(filterByName).then((function (data) {
      this.setState({
        filterValue: filterByName,
        taskList: data.taskList,
        loaded: true
      });
    }).bind(this));
  }
});

module.exports = TasksList;
