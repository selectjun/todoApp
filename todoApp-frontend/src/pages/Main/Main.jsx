import React, { useEffect, useState } from "react";

import TodoList from "@components/TodoList";
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

  useEffect(() => {
    API.get("/todo/").then(res => {
      if (res.data.success) {
        res.data.todoList.map(todo => props.addTodo(todo));
      } else {
        alert("에러가 발생하였습니다.\n새로고침(F5) 후, 다시 시도해주세요.");
      }
    });
    API.get("/todo/count/").then(res => {
      if (res.data.success) {
        setTodoCount(res.data.count);
      } else {
        alert("에러가 발생하였습니다.\n새로고침(F5) 후, 다시 시도해주세요.");
      }
    });
  }, []);

  const decreaseTodoCount = () => {
    setTodoCount(todoCount - 1);
  }

  const submitTodo = (target) => {
    const url = `/todo/?title=${todo.title}`;
    API.post(url).then(res => {
      if (res.data.success) {
        props.addTodo(todo);
        setTodoCount(todoCount + 1);
        target.value = "";
      } else {
        alert("에러가 발생하였습니다.\n잠시 후, 다시 시도해주세요.");
      }
    })
  }

  const handleTodo = (key, value) => {
    setTodo({
      ...todo,
      [key]: [value]
    });
  }

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
        <section className="main">
          <TodoList
            todoList={props.todoList}
            deleteTodo={props.deleteTodo}
            decreaseTodoCount={decreaseTodoCount} />
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{todoCount}</strong> item left
          </span>
          <ul className="filters">
            <li>
              <a href="" className="selected">All</a>
            </li>
            <li>
              <a href="">Active</a>
            </li>
            <li>
              <a href="">Completed</a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    </div>
  );
}


export default Main;