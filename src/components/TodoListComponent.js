import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showlist: 'DONT_SHOW_LIST',
      showactive: 'DONT_SHOW_ACTIVE',
      showcomplete: 'DONT_SHOW_COMPLETE',
      completed: false,
      todosList: ['hello there', 'joker', 'wonderwoman'],
      todosListCompleted: [],
      userInput: ''
    };
  }

  showList = event => {
    event.preventDefault();
    let { showlist } = this.state;
    if (showlist === 'DONT_SHOW_LIST') {
      this.setState({ showlist: 'SHOW_LIST' });
    } else {
      this.setState({ showlist: 'DONT_SHOW_LIST' });
    }
  };

  showActive = event => {
    event.preventDefault();
    let { showactive } = this.state;
    if (showactive === 'DONT_SHOW_ACTIVE') {
      this.setState({ showactive: 'SHOW_ACTIVE' });
    } else {
      this.setState({ showactive: 'DONT_SHOW_ACTIVE' });
    }
  };

  showComplete = event => {
    event.preventDefault();
    let { showcomplete } = this.state;
    if (showcomplete === 'DONT_SHOW_COMPLETE') {
      this.setState({ showcomplete: 'SHOW_COMPLETE' });
    } else {
      this.setState({ showcomplete: 'DONT_SHOW_COMPLETE' });
    }
  };

  handle_completed = event => {
    event.preventDefault();
    let { completed } = this.state;
    if (completed === false) {
      this.setState({ completed: true });
    } else {
      this.setState({ completed: false });
    }
  };

  deleteTodoList = (event, data) => {
    event.preventDefault();
    let { todosList } = this.state;
    let deleteListId = Number(event.target.id);

    todosList.splice(deleteListId, 1);
  };

  handle_AddToLIst = event => {
    event.preventDefault();
    let { todosList, userInput } = this.state;
    let updated = todosList.slice(0);
    updated.push(userInput);

    this.setState({ todosList: [...updated], userInput: '' });
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
      todosList,
      userInput,
      completed
    } = this.state;

    return (
      <div className="container">
        <div />
        <div className="wrapper">
          <div className="header">
            <a href="#" id={showlist} onClick={this.showList}>
              <div className="fa fa-list" />
            </a>
            <a href="#" id={showactive} onClick={this.showActive}>
              <div className="fa fa-circle" />
            </a>
            <a href="#" id={showcomplete} onClick={this.showComplete}>
              <div className="fa fa-check-circle" />
            </a>
          </div>
          <div className="visibleTodoList">
            <ReactCSSTransitionGroup
              id="TodoList"
              component="ul"
              transitionName="todo"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {todosList.map((todo, i) => (
                <li
                  key={i}
                  onClick={this.handle_completed}
                  className={'todo' + (completed ? ' todo-completed' : '')}>
                  <i
                    className={
                      'fa ' +
                      (completed ? 'fa fa-check-circle' : 'fa fa-circle')
                    }
                  />
                  {todo}
                  <i
                    id={i}
                    onClick={this.deleteTodoList}
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
            <button type="submit" onClick={this.handle_AddToLIst}>
              <i className="fa fa-plus" />
            </button>
          </form>
        </div>
        <div />
      </div>
    );
  }
}
