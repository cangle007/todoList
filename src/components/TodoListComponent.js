import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showlist: 'DONT_SHOW_LIST',
      showactive: 'DONT_SHOW_ACTIVE',
      showcomplete: 'DONT_SHOW_COMPLETE',
      todosList: [
        { todo: 'The Snake', completed: false },
        { todo: 'is', completed: true },
        { todo: 'Kevin Duran', completed: false }
      ],
      displayTodosList: [
        { todo: 'The Snake', completed: false },
        { todo: 'is', completed: true },
        { todo: 'Kevin Duran', completed: false }
      ],
      userInput: ''
    };
  }

  showList = event => {
    event.preventDefault();
    let { todosList } = this.state;
    this.setState({
      displayTodosList: [...todosList],
      showlist: 'SHOW_LIST',
      showactive: 'DONT_SHOW_ACTIVE',
      showcomplete: 'DONT_SHOW_COMPLETE'
    });
  };

  showActive = event => {
    event.preventDefault();
    let { todosList } = this.state;

    let filtered = todosList.filter(obj => {
      return obj.completed === false;
    });

    this.setState({
      displayTodosList: [...filtered],
      showactive: 'SHOW_ACTIVE',
      showcomplete: 'DONT_SHOW_COMPLETE',
      showlist: 'DONT_SHOW_LIST'
    });
  };

  showComplete = event => {
    event.preventDefault();
    let { todosList } = this.state;
    let filtered = todosList.filter(obj => {
      return obj.completed === true;
    });

    this.setState({
      displayTodosList: [...filtered],
      showcomplete: 'SHOW_COMPLETE',
      showactive: 'DONT_SHOW_ACTIVE',
      showlist: 'DONT_SHOW_LIST'
    });
  };

  handle_completed = event => {
    event.preventDefault();
    let { displayTodosList } = this.state;
    let id = Number(event.target.id);

    let updated = displayTodosList.map((obj, i) => {
      if (i === id && obj.completed === false) {
        obj.completed = true;
      } else if (i === id && obj.completed === true) {
        obj.completed = false;
      }
      return obj;
    });
    this.setState({ todosList: [...updated], displayTodosList: [...updated] });
  };

  handle_deleteTodoList = (event, data) => {
    event.preventDefault();
    let { todosList, displayTodosList } = this.state;
    let id = Number(event.target.id);

    for (let i = 0; i < displayTodosList.length; i++) {
      if (id === i) {
        todosList.splice(id, 1);
        displayTodosList.splice(id, 1);
      }
    }
    this.setState({ todosList: todosList, displayTodosList: displayTodosList });
  };

  handle_AddTodoList = event => {
    event.preventDefault();
    let { todosList, userInput, displayTodosList } = this.state;
    let obj = { todo: userInput, completed: false };
    let updatedTodosList = todosList.slice(0);
    let updatedDisplayTodosList = displayTodosList.slice(0);

    updatedTodosList.push(obj);
    updatedDisplayTodosList.push(obj);

    this.setState({
      todosList: [...updatedTodosList],
      displayTodosList: [...updatedDisplayTodosList],
      userInput: ''
    });
  };

  handle_UserInput = event => {
    event.preventDefault();
    this.setState({ userInput: event.target.value });
  };

  render() {
    let {
      showlist,
      showactive,
      showcomplete,
      displayTodosList,
      userInput
    } = this.state;
    return (
      <div className="container">
        <div />
        <div className="wrapper">
          <div className="header">
            <span id={showlist} onClick={this.showList}>
              <i className="fa fa-list" />
            </span>
            <span id={showactive} onClick={this.showActive}>
              <i className="fa fa-circle" />
            </span>
            <span id={showcomplete} onClick={this.showComplete}>
              <i className="fa fa-check-circle" />
            </span>
          </div>
          <div className="visibleTodoList">
            <ReactCSSTransitionGroup
              id="TodoList"
              component="ul"
              transitionName="todo"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {displayTodosList.map((obj, i) => (
                <li
                  key={i}
                  id={i}
                  className={'todo' + (obj.completed ? ' todo-completed' : '')}>
                  <i
                    id={i}
                    onClick={this.handle_completed}
                    className={
                      'fa ' +
                      (obj.completed ? 'fa fa-check-circle' : 'fa fa-circle')
                    }
                  />
                  {obj.todo}
                  <i
                    id={i}
                    onClick={this.handle_deleteTodoList}
                    className="fa fa-times"
                  />
                </li>
              ))}
            </ReactCSSTransitionGroup>
          </div>

          <form id="AddTodo" className="userInput">
            <input
              type="text"
              value={userInput}
              placeholder="input..."
              onChange={this.handle_UserInput}
            />
            <button type="submit" onClick={this.handle_AddTodoList}>
              <i className="fa fa-plus" />
            </button>
          </form>
        </div>
        <div />
      </div>
    );
  }
}
