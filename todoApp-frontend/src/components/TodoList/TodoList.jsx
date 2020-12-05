import React from "react";

import Todo from "./Todo";

const TodoList = (props) => {
  return (
    <ul>
      {
        props.todoList
        ? props.todoList.map((todo, todoIndex) => {
          return <Todo todo={todo} key={todoIndex} />;
        })
        : <li>데이터가 존재하지 않습니다.</li>
      }
    </ul>
  );
}

export default TodoList;