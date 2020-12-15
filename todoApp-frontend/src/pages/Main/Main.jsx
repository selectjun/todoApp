import React, { useEffect, useState } from "react";

import TodoList from "@components/TodoList";
import TodoFooter from "@components/TodoFooter";

import { API } from "@components/axios";

import "./main.scss"

const Main = (props) => {
  const [todoCount, setTodoCount] = useState(0);
  const [todo, setTodo] = useState({
    todoId: null,
    title: "",
    createAt: null,
    updateAt: null,
    isComplete: false,
    isDelete: false
  });

  const handleTodo = (key, value) => {
    setTodo({
      ...todo,
      [key]: [value]
    });
  };

  const decreaseTodoCount = () => setTodoCount(todoCount - 1);
  const increaceTodoCount = () => setTodoCount(todoCount + 1);

  const submitTodo = (target) => {
    const url = `/todo/?title=${todo.title}`;
    API.post(url).then(res => {
      if (res.data.success) {
        handleTodo("todoId", res.data.todoId);
        props.addTodo(todo);
        increaceTodoCount();
        target.value = "";
      } else {
        alert("에러가 발생하였습니다.\n잠시 후, 다시 시도해주세요.");
      }
    })
  };

  useEffect(() => {
    // To Do 목록 가져오기
    API.get("/todo/").then(res => {
      if (res.data.success) {
        res.data.todoList.map(todo => props.addTodo(todo));
      } else {
        alert("에러가 발생하였습니다.\n새로고침(F5) 후, 다시 시도해주세요.");
      }
    });

    // To Do 전체 갯수 가져오기
    API.get("/todo/count/").then(res => {
      if (res.data.success) {
        setTodoCount(res.data.count);
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
            className="new-todo"
            onChange={e => handleTodo("title", e.target.value)}
            onKeyDown={e => {
              if(e.key == "Enter") {
                submitTodo(e.target);
              }
            }}
            placeholder="What needs to be done?" />
        </header>
        <TodoList
          todoList={props.todoList}
          deleteTodo={props.deleteTodo}
          completeTodo={props.completeTodo}
          decreaseTodoCount={decreaseTodoCount} />
        <TodoFooter
          todoCount={todoCount} />
      </section>
    </div>
  );
}


export default Main;