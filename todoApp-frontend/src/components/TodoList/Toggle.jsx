import React from "react";

import { API } from "@components/axios";

const Toggle = ({
  todoList,
  completeTodo,
  currentIsCompleteAll,
  onChangeCurrentIsCompleteAll
}) => {
  return (
    todoList
    ? <span>
      <input
        type="checkbox"
        id="toggle-all"
        checked={todoList.length === todoList.filter(todo => todo.isComplete).length && todoList.length}
        className="toggle-all"
        onChange={() => {
          todoList.map(todo => {
            if (!todo.isComplete === currentIsCompleteAll
                || todoList.length === todoList.filter(todo => !todo.isComplete).length
                || todoList.length === todoList.filter(todo => todo.isComplete).length) {
              const url = `/api/todo/${todo.todoId}/complete/`;
              API.put(url).then(res => {
                if (res.data.success) {
                  completeTodo(todo.todoId);
                } else {
                  alert("완료 처리하는 중, 에러가 발생하였습니다.");
                }
              });
            }
          });
          onChangeCurrentIsCompleteAll();
        }} />
      <label htmlFor="toggle-all">Mark all as completed</label>
    </span>
    : null
  )
}

export default Toggle;