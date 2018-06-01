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
        { todo: 'kool', completed: false },
        { todo: 'whtsup', completed: true },
        { todo: 'getAjob', completed: false }
      ],
      displayTodosList: [
        { todo: 'kool', completed: false },
        { todo: 'whtsup', completed: true },
        { todo: 'getAjob', completed: false }
      ],
      userInput: ''
    };
  }

  // { todo: 'kool', completed: false },
  // { todo: 'whtsup', completed: true },
  // { todo: 'getAjob', completed: false }
  showList = event => {
    event.preventDefault();
    let { showlist, todosList } = this.state;
    this.setState({
      displayTodosList: [...todosList],
      showlist: 'SHOW_LIST',
      showactive: 'DONT_SHOW_ACTIVE',
      showcomplete: 'DONT_SHOW_COMPLETE'
    });

    // if (showlist === 'DONT_SHOW_LIST') {
    //   this.setState({ showlist: 'SHOW_LIST' });
    // } else {
    //   this.setState({ showlist: 'DONT_SHOW_LIST' });
    // }
  };

  showActive = event => {
    event.preventDefault();
    let { showactive, todosList, displayTodosList } = this.state;

    let filtered = todosList.filter(obj => {
      return obj.completed === false;
    });

    this.setState({
      displayTodosList: [...filtered],
      showactive: 'SHOW_ACTIVE',
      showcomplete: 'DONT_SHOW_COMPLETE',
      showlist: 'DONT_SHOW_LIST'
    });

    // if (showactive === 'DONT_SHOW_ACTIVE') {
    //   this.setState({ showactive: 'SHOW_ACTIVE' });
    // } else {
    //   this.setState({ showactive: 'DONT_SHOW_ACTIVE' });
    // }
  };

  showComplete = event => {
    event.preventDefault();
    let { showcomplete, todosList, displayTodosList } = this.state;
    let filtered = todosList.filter(obj => {
      return obj.completed === true;
    });

    this.setState({
      displayTodosList: [...filtered],
      showcomplete: 'SHOW_COMPLETE',
      showactive: 'DONT_SHOW_ACTIVE'
    });

    // if (showcomplete === 'DONT_SHOW_COMPLETE') {
    //   this.setState({ showcomplete: 'SHOW_COMPLETE' });
    // } else {
    //   this.setState({ showcomplete: 'DONT_SHOW_COMPLETE' });
    // }
  };

  handle_completed = event => {
    event.preventDefault();
    let { todosList } = this.state;
    let id = Number(event.target.id);

    let updated = todosList.map((obj, i) => {
      if (i === id && obj.completed === false) {
        obj.completed = true;
      } else if (i === id && obj.completed === true) {
        obj.completed = false;
      }
      return obj;
    });
    this.setState({ todosList: [...updated] });
  };

  handle_deleteTodoList = (event, data) => {
    event.preventDefault();
    let { todosList } = this.state;
    let id = Number(event.target.id);

    for (let i = 0; i < todosList.length; i++) {
      if (id === i) {
        todosList.splice(id, 1);
      }
    }
    this.setState({ todosList: todosList });
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
      todosList,
      displayTodosList,
      userInput
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
