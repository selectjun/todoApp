import React from "react";

import { API } from "@components/axios";

import "./todoFooter.scss"

const TodoFooter = ({
  filter,
  todoList,
  todoCount,
  deleteTodo,
  onChangeFilter,
  onDecreaseTodoCount,
  isClearCompleted,
}) => {
  // 완료된 To Do 일괄 삭제 처리
  const clearCompleted = () => {
    todoList.filter(todo => todo.isComplete).map(todo => {
      const url = `/api/todo/${todo.todoId}/delete/`;
      API.put(url).then(res => {
        if (res.data.success) {
          deleteTodo(todo.todoId);
          onDecreaseTodoCount();
        }
      });
    });
  };

  return (
    todoCount
    ? <footer className="footer">
      <span className="todo-count">
        <strong>{todoCount}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#ALL"
            className={filter === "ALL" ? "selected" : null}
            onClick={(e) => {
              e.preventDefault();
              onChangeFilter("ALL");
            }}>All</a>
        </li>
        <li>
          <a
            href="#ACTIVE"
            className={filter === "ACTIVE" ? "selected" : null}
            onClick={(e) => {
              e.preventDefault();
              onChangeFilter("ACTIVE");
            }}>Active</a>
        </li>
        <li>
          <a
            href="#COMPLETED"
            className={filter === "COMPLETED" ? "selected" : null}
            onClick={(e) => {
              e.preventDefault();
              onChangeFilter("COMPLETED");
            }}>Completed</a>
        </li>
      </ul>
      {
        isClearCompleted
        ? <button 
            className="clear-completed"
            onClick={clearCompleted}>Clear completed</button>
        : null
      }
    </footer>
    : null
  );
}

export default TodoFooter;