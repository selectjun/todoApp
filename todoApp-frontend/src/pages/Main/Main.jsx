import React, { useCallback, useEffect, useReducer, useState } from "react";

import TodoList from "@components/TodoList";
import TodoFooter from "@components/TodoFooter";

import { API } from "@components/axios";

import "./main.scss"

const initialState = {
  todoCount: 0,
  todo: {
    todoId: "",
    title: "",
    createAt: null,
    updateAt: null,
    isComplete: false,
    isDelete: false
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO_COUT":
      return {
        ...state,
        todoCount: action.todoCount
      }
    case "INCREASE_TODO_COUNT":
      return {
        ...state,
        todoCount: state.todoCount + 1
      }
    case "DECREASE_TODO_COUNT":
      return {
        ...state,
        todoCount: state.todoCount - 1
      }
    case "SET_TODO_ID":
      return {
        ...state,
        todo: {
          ...state.todo,
          todoId: action.todoId
        }
      }
    case "RESET_TITLE":
      return {
        ...state,
        todo: {
          ...state.todo,
          title: ""
        }
      }
    case "CHANGE_INPUT":
      return {
        ...state,
        todo: {
          ...state.todo,
          [action.name]: action.value
        }
      }
    default:
      return state;
  }
}

const Main = ({
  todoList,
  addTodo,
  deleteTodo,
  completeTodo
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todoCount, todo } = state;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value
    });
  });

  const onResetTitle = useCallback(() => dispatch({ type: "RESET_TITLE" }));
  const onIncreaseTodoCount = useCallback(() => dispatch({ type: "INCREASE_TODO_COUNT" }));
  const onDecreaseTodoCount = useCallback(() => dispatch({ type: "DECREASE_TODO_COUNT" }));

  const submitTodo = useCallback(e => {
    const url = `/todo/?title=${todo.title}`;
    API.post(url).then(res => {
      if (res.data.success) {
        dispatch({
          type: "SET_TODO_ID",
          todoId: res.data.todoId
        });
        addTodo(state.todo);
        onIncreaseTodoCount();
        onResetTitle();
      } else {
        alert("에러가 발생하였습니다.\n잠시 후, 다시 시도해주세요.");
      }
    })
  });

  useEffect(() => {
    // To Do 목록 가져오기
    API.get("/todo/").then(res => {
      if (res.data.success) {
        res.data.todoList.map(todo => addTodo(todo));
      } else {
        alert("에러가 발생하였습니다.\n새로고침(F5) 후, 다시 시도해주세요.");
      }
    });

    // To Do 전체 갯수 가져오기
    API.get("/todo/count/").then(res => {
      if (res.data.success) {
        dispatch({
          type: "SET_TODO_COUT",
          todoCount: res.data.count
        });
      } else {
        alert("에러가 발생하였습니다.\n새로고침(F5) 후, 다시 시도해주세요.");
      }
    });
  }, []);

  return (
    <div className="container">
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <input
            type="text"
            name="title"
            className="new-todo"
            value={todo.title}
            onChange={onChange}
            onKeyDown={e => e.key === "Enter" ? submitTodo(e): false }
            placeholder="What needs to be done?" />
        </header>
        <TodoList
          todoList={todoList}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          onDecreaseTodoCount={onDecreaseTodoCount} />
        <TodoFooter
          todoCount={todoCount} />
      </section>
    </div>
  );
}


export default Main;