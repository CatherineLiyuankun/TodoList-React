import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './images/logo.svg';
import Model from './Model.js';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <TodoListApp />
      </div>
    );
  }
};

var TodoListApp = React.createClass({
  getInitialState: function() {
    return {
      data: [
        {"id": "0001", "task":"test", "importance":"Normal", "complete": false},
        {"id": "0002", "task":"investigate issue", "importance":"Normal", "complete": false},
        {"id": "0003", "task":"fix issue", "importance":"Normal", "complete": true},
      ]
    };
  },

  // generate a random id for new task 
  generateId: function() {
    return Math.floor(Math.random() * 9000) + 1000;
  },

  getIndexById: function getIndexById(taskId) {
    var index = 0;
    for (; index < this.state.data.length; index++) {
        if (this.state.data[index].id === taskId)
            return index;
    }
  },

  handleTaskAdd: function(taskContent) {
    var data = this.state.data;
    var newItem = [{"id": this.generateId(), "task": taskContent, "importance":"Normal", "complete": false}];
    data = newItem.concat(data);
    this.setState({data});
  },

  handleTaskDelete: function(taskId) {
    var data = this.state.data;
    data = data.filter(function(taskItem){
      return taskItem.id !== taskId;
    });
    this.setState({data});
  },

  handleToggleComplete: function(taskId) {
    var data = this.state.data;
    var index = this.getIndexById(taskId);
    data[index].complete = data[index].complete ? false: true;
    this.setState({data});
  },

  handleUpdateTask: function(taskId, taskContent) {
    var data = this.state.data;
    var index = this.getIndexById(taskId);
    data[index].task = taskContent;
    this.setState({data});
  },

  handleTaskIndex: function(taskId){
    return this.getIndexById(taskId, this.state.data);
  },

  render: function() {
    var statistics = {
      // count the total task number and completed task number
      todoCount: this.state.data.length || 0,
      todoCompleteCount: this.state.data.filter(function(item) {
        return item.complete === true;
      }).length
    };
    return (
      <div className="TodoList-app">
        <TodoHeader headerName="My Todo List"/>
        <TodoAction addTask={this.handleTaskAdd}/>
        <TodoDataGrid data={this.state.data}
            deleteTask={this.handleTaskDelete}
            toggleComplete={this.handleToggleComplete} 
            updateTask={this.handleUpdateTask}
            getTaskIndex={this.handleTaskIndex}
             />
        <TodoFooter todoCount={statistics.todoCount}
            todoCompleteCount={statistics.todoCompleteCount} />
      </div>
      
    )
  }
});

var TodoHeader = React.createClass({
  render: function() {
    return (
      <div className="Todo-header">
        <div className="logo-container"><img src={logo} className="App-logo" alt="logo" /></div>
        <div className="header-text-container"><h2 className="App-header-text">{this.props.headerName}</h2></div>
      </div>
    )   
  }
});

var TodoAction = React.createClass({
  addTask: function(e) {
    var keycode=document.all?event.keyCode:e.which;
    if(keycode===13) {
      e.preventDefault();
      var taskContent = ReactDOM.findDOMNode(this.refs.newTaskContent).value.trim();
      if (!taskContent) {
        return;
      }
      this.props.addTask(taskContent);
      ReactDOM.findDOMNode(this.refs.newTaskContent).value = "";
      this.refs.newTaskContent.focus();
    }
  },

  render: function() {
    return (
      <input className="Todo-input" placeholder="What needs to be done?" ref="newTaskContent" onKeyPress={this.addTask}/>
    )
  }
});

var TodoDataGrid = React.createClass({
  render: function() {
    var itemsList = this.props.data.map(function(listItem) {
      return (
        <TodoRow
          taskId={listItem.id}
          key={listItem.id}
          task={listItem.task}
          importance={listItem.importance}
          complete={listItem.complete}
          deleteTask={this.props.deleteTask}
          updateTask={this.props.updateTask}
          toggleComplete={this.props.toggleComplete}
          getTaskIndex={this.props.getTaskIndex}/>
      )
    }, this);

    return (
      <div className="DataGrid">
        <div className="DataGrid-headerContainer">
          <TodoGridHeader />
        </div>
        <div className="DataGrid-itemsScrollBox">
            <div className="DataGrid-itemsContainer">
                  <table className="DataGrid-itemwrap-table" cellSpacing="0" cellPadding="0">
                    <colgroup>
                      <col className="col0" /><col className="col1" /><col className="col2" /><col className="col3" />
                    </colgroup>
                    <tbody>
                       {itemsList}
                    </tbody>
                  </table>
            </div>
        </div>
      </div>
    )
  }
});

var TodoGridHeader = React.createClass({
  render: function() {
    var gridheaderNames = ['', 'Sort By Task', 'Sort By importance'];
    var gridheader = gridheaderNames.map(function(headerColumn) {
      return (
        <td><div className="DataGrid-headerText">{headerColumn}</div></td>
      )
    });
    return (
      <table className="DataGrid-headerTable" cellSpacing="0" cellPadding="0">
        <colgroup>
          <col className="col0-h" /><col className="col1-h" /><col className="col2-h" /><col className="col3-h" />
        </colgroup>
        <tbody>
          <tr>{gridheader}</tr>
        </tbody>
      </table>
    )
  }
});

var TodoRow = React.createClass({
  getInitialState: function() {
    return {
      classes: "DataRow",
      index: 0,
    };
  },
  componentDidMount: function() {
    this.setState({classes: this.state.classes, index: this.getTaskIndex()});
  },
  toggleComplete: function() {
    this.props.toggleComplete(this.props.taskId);
  },
  updateTask: function() {
    var taskContent = ReactDOM.findDOMNode(this.refs.taskContent).value.trim();
    this.props.updateTask(this.props.taskId, taskContent);
  },
  deleteTask: function() {
    this.props.deleteTask(this.props.taskId);
  },
  getTaskIndex: function() {
    return this.props.getTaskIndex(this.props.taskId);
  },
  selectTask: function() {
    var classes = this.state.classes;
    classes += " selected";
    // this.setState({classes: classes, index: this.getTaskIndex()});
  },
  importanceTask: function(){
    
  },
  render: function() {
    var classes = this.state.classes;
    classes += (this.getTaskIndex() % 2 === 1) ? ' odd' : ' even';

    return (
      <tr className={classes} onFocus={this.selectTask} >
        <td>
          <input type="checkbox" checked={this.props.complete} onChange={this.toggleComplete} className="check-task" />
        </td>
        <td>
           <input className="task-content" ref="taskContent" onChange={this.updateTask} value={this.props.task} />
        </td>
        <td>
           <button className="importance-button" ref="taskImportance" onChange={this.updateTask} onClick={this.importanceTask}>{this.props.importance}</button>
        </td>
        <td>
          <div className="delete-task" onClick={this.deleteTask}></div>
        </td>
      </tr>
    )
  }
});

var TodoFooter = React.createClass({
  render: function() {
    return (
      <div className="Todo-footer"> total: {this.props.todoCount} actives: {this.props.todoCount - this.props.todoCompleteCount} completes: {this.props.todoCompleteCount}</div>
    )
  }
});

export default App;
