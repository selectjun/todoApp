import React from "react";

import { API } from "@components/axios";

const Todo = (props) => {
  const clickDeleteBtn = (todoId) => {
    console.log(todoId);
    const url = `/todo/${todoId}/delete/`;
    API.put(url).then(res => {
      if (res.data.success) {
        
      } else {
        alert("삭제하던 중, 에러가 발생하였습니다.");
      }
    })
  }

  return (
    <li>
      {props.todo.title}
      &nbsp;
      <button 
        style={{
          color: "red",
        }}
        onClick={() => clickDeleteBtn(props.todo.todoId)}>삭제</button>
    </li>
  );
}

export default Todo;