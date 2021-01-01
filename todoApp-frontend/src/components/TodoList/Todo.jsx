import React, { useCallback } from "react";

import { API } from "@components/axios";

const Todo = ({
  todo,
  deleteTodo,
  completeTodo,
  onDecreaseTodoCount,
  onClickOpenUpdateModal
}) => {
  const onClickDeleteButton = useCallback((todoId) => {
    const url = `/api/todo/${todoId}/delete/`;
    API.put(url).then(res => {
       if (res.data.success) {
         deleteTodo(todoId);
         onDecreaseTodoCount();
       }
    });
  });

  const onClickCompleteButton = useCallback((todoId) => {
    const url = `/api/todo/${todoId}/complete/`;
    API.put(url).then(res => {
       if (res.data.success) {
         completeTodo(todo.todoId);
       } else {
         alert("완료 처리하는 중, 에러가 발생하였습니다.");
       }
    });
  });

  return (
    todo 
    ? <li className={todo.isComplete ? "completed" : null}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.isComplete}
          onChange={() => onClickCompleteButton(todo.todoId)} />
        <label
          htmlFor=""
          onClick={() => onClickOpenUpdateModal(todo.todoId)}>{todo.title}</label>
        <button
          className="destroy" 
          onClick={() => onClickDeleteButton(todo.todoId)}></button>
      </div>
    </li>
    : false
  );
}

export default Todo;