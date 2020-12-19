import React from "react";
import { connect } from "react-redux";

import Main from "../pages/Main";
import { addTodo, deleteTodo, completeTodo } from "../store/modules/todoList";

// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  todoList: state.todoList,
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo)),
  deleteTodo: todoId => dispatch(deleteTodo(todoId)),
  completeTodo: todoId => dispatch(completeTodo(todoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(props =>
  <Main
    todoList={props.todoList}
    addTodo={props.addTodo}
    deleteTodo={props.deleteTodo}
    completeTodo={props.completeTodo} />
);