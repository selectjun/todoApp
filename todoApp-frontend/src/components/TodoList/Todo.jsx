import React from "react";

import { API } from "@components/axios";

const Todo = (props) => {
  const clickDeleteBtn = (todoId) => {
    console.log(todoId);
    const url = `/todo/${todoId}/delete/`;
    API.put(url).then(res => {
       if (res.data.success) {
         props.deleteTodo(todoId);
         props.decreaseTodoCount();
       } else {
         alert("삭제하던 중, 에러가 발생하였습니다.");
       }
    });
  }

  return (
    props.todo 
    ? <li>
      <div className="view">
        <input type="checkbox" className="toggle" name="" id=""/>
        <label htmlFor="">{props.todo.title}</label>
        <button
          className="destroy" 
          onClick={() => clickDeleteBtn(props.todo.todoId)}></button>
      </div>
    </li>
    : false
  );
}

export default Todo;