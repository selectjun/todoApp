import React from "react";

import Todo from "./Todo";

import { API } from "@components/axios";

const TodoList = ({
  filter,
  todoList,
  deleteTodo,
  completeTodo,
  currentIsCompleteAll,
  onChangeCurrentIsCompleteAll,
  onDecreaseTodoCount
}) => {
  return (
    <section className="main">
      <ul className="todo-list">
        <input
          type="checkbox"
          id="toggle-all"
          checked={todoList.length === todoList.filter(todo => todo.isComplete).length}
          className="toggle-all"
          onChange={() => {
            todoList.map(todo => {
              if (!todo.isComplete === currentIsCompleteAll
                  || todoList.length === todoList.filter(todo => !todo.isComplete).length
                  || todoList.length === todoList.filter(todo => todo.isComplete).length) {
                const url = `/todo/${todo.todoId}/complete/`;
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
        {
          todoList
          ? todoList.filter(todo => {
            if (filter == "ACTIVE") return !todo.isComplete
            else if (filter == "COMPLETED") return todo.isComplete
            else return true;
          }).map((todo, todoIndex) => {
            return (
              <Todo 
                todo={todo}
                key={todoIndex}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
                onDecreaseTodoCount={onDecreaseTodoCount} />
            );
          })
          : null
        }
      </ul>
    </section>
  );
}

export default TodoList;