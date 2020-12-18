import React from "react";

import { API } from "@components/axios";

const Todo = ({
  todo,
  deleteTodo,
  completeTodo,
  onDecreaseTodoCount
}) => {
  const onClickDeleteButton = (todoId) => {
    const url = `/todo/${todoId}/delete/`;
    API.put(url).then(res => {
       if (res.data.success) {
         deleteTodo(todoId);
         onDecreaseTodoCount();
       } else {
         alert("삭제하는 중, 에러가 발생하였습니다.");
       }
    });
  }

  const onClickCompleteButton = (todoId) => {
    const url = `/todo/${todoId}/complete/`;
    API.put(url).then(res => {
       if (res.data.success) {
         completeTodo(todo.todoId);
       } else {
         alert("완료 처리하는 중, 에러가 발생하였습니다.");
       }
    });
  }

  return (
    todo 
    ? <li className={
        todo.isComplete
        ? "completed"
        : null
      }>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.isComplete}
          onChange={(e) => onClickCompleteButton(todo.todoId)} />
        <label htmlFor="">{todo.title}</label>
        <button
          className="destroy" 
          onClick={() => onClickDeleteButton(todo.todoId)}></button>
      </div>
    </li>
    : false
  );
}

export default Todo;