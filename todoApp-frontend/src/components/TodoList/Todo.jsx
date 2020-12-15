import React from "react";

import { API } from "@components/axios";

const Todo = (props) => {
  const clickDeleteBtn = (todoId) => {
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

  const clickCompleteBtn = (todoId, target) => {
    const url = `/todo/${todoId}/complete/`;
    API.put(url).then(res => {
       if (res.data.success) {
         props.completeTodo(props.todo.todoId);
         target.parentNode.parentNode.classList.toggle("completed");
       } else {
         alert("삭제하던 중, 에러가 발생하였습니다.");
       }
    });
  }

  return (
    props.todo 
    ? <li className={
        props.todo.isComplete
        ? "completed"
        : null
      }>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          defaultChecked={props.todo.isComplete}
          onClick={(e) => clickCompleteBtn(props.todo.todoId, e.target)} />
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