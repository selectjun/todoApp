import React, { Component } from "react";
import { connect } from "react-redux";

import Main from "../pages/Main";
import { addTodo, deleteTodo } from "../store/modules/todoList";


class MainContainer extends Component {
  render() {
    return (
      <Main
        todoList={this.props.todoList}
        addTodo={this.props.addTodo}
        deleteTodo={this.props.deleteTodo} />
    );
  }
}

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  todoList: state.todoList,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo)),
  deleteTodo: todoId => dispatch(deleteTodo(todoId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);