import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TodoListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'plaeholder',
      showlist: 'DONT_SHOW_LIST',
      showactive: 'DONT_SHOW_ACTIVE',
      showcomplete: 'DONT_SHOW_COMPLETE',
      completed: true,
      todos: ['hello there', ' joker']
    };
  }

  placeholderFunction = () => {
    return this.state.placeholder;
  };

  showList = () => {
    let { showlist } = this.state;
    if (showlist === 'DONT_SHOW_LIST') {
      this.setState({ showlist: 'SHOW_LIST' });
    } else {
      this.setState({ showlist: 'DONT_SHOW_LIST' });
    }
  };

  showActive = () => {
    let { showactive } = this.state;
    if (showactive === 'DONT_SHOW_ACTIVE') {
      this.setState({ showactive: 'SHOW_ACTIVE' });
    } else {
      this.setState({ showactive: 'DONT_SHOW_ACTIVE' });
    }
  };

  showComplete = () => {
    let { showcomplete } = this.state;
    if (showcomplete === 'DONT_SHOW_COMPLETE') {
      this.setState({ showcomplete: 'SHOW_COMPLETE' });
    } else {
      this.setState({ showcomplete: 'DONT_SHOW_COMPLETE' });
    }
  };

  render() {
    let {
      showlist,
      showactive,
      showcomplete,
      showtodos,
      todos,
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
              {todos.map(todo => (
                <li className={'todo' + (completed ? ' todo-completed' : '')}>
                  <i
                    className={
                      'fa ' + (completed ? 'fa-dot-circle-o' : 'fa-circle-o')
                    }
                  />
                  {todo}

                  <i className="fa fa-times" />
                </li>
              ))}
            </ReactCSSTransitionGroup>
          </div>
          <div className="userInput">userInput</div>
        </div>
        <div />
      </div>
    );
  }
}
