import React, { useEffect, useState } from "react";

import TodoList from "@components/TodoList";
import { API } from "@components/axios";

import "./main.scss"

const Main = (props) => {
  const [todoList, setTodoList] = useState(0);

  useEffect(() => {
    API.get("/todo/").then(res => {
      if (res.data.success) {
        setTodoList(res.data.todoList);
      } else {
        alert("에러가 발상하였습니다.\n새로고침(F5) 후, 다시 시도해주세요.");
      }
    });
  }, []);

  const submitTodo = () => {
    const url = `/todo/?title=${props.title}`;
    API.post(url).then(res => {
      if (res.data.success) {
        setTodoList([...todoList, {"title": todo.title, "todoId": res.data.todoId}]);
      } else {
        alert("에러가 발상하였습니다.\n잠시 후, 다시 시도해주세요.");
      }
    }).catch(err => {
      console.log(err);
    });
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
            name=""
            id=""
            placeholder="What needs to be done?" />
        </header>
        <section className="main">
          <ul className="todo-list">
            <li>
              <div className="view">
                <input type="checkbox" className="toggle" name="" id=""/>
                <label htmlFor="">123</label>
                <button className="destroy"></button>
              </div>
            </li>
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>1</strong> item left
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
        {
          /*<h1>Main...</h1>
          <input
            type="text"
            value={props.title}
            placeholder="할 일을 입력해주세요"
            onChange={e => props.changeTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key == "Enter") {
                submitTodo();
              }
            }} />
          <TodoList todoList={todoList} />*/
        }
      </section>
    </div>
  );
}


export default Main;