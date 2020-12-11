import React, { useEffect, useState } from "react";

import TodoList from "@components/TodoList";
import { API } from "@components/axios";

const Main = () => {
  const [todoList, setTodoList] = useState(0);
  const [todo, setTodo] = useState({title: ""});

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
    const url = `/todo/?title=${todo.title}`;
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
    <div>
      <h1>Main...</h1>
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        onChange={e => handleTodo("title", e.target.value)}
        onKeyDown={e => {
          if (e.key == "Enter") {
            submitTodo();
          }
        }} />
      <TodoList todoList={todoList} />
    </div>
  );
}


export default Main;