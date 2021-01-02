import React from "react";

import Todo from "./Todo";
import Toggle from "./Toggle";

import "./todoList.scss";

const TodoList = ({
  filter,
  todoList,
  deleteTodo,
  completeTodo,
  onDecreaseTodoCount,
  currentIsCompleteAll,
  onClickOpenUpdateModal,
  onChangeCurrentIsCompleteAll,
}) => {
  return (
    <section className="main">
      <ul className="todo-list">
        <Toggle
          todoList={todoList}
          completeTodo={completeTodo}
          currentIsCompleteAll={currentIsCompleteAll}
          onChangeCurrentIsCompleteAll={onChangeCurrentIsCompleteAll} />
        {
          todoList
          ? todoList.filter(todo => {
            if (filter == "ACTIVE") { return !todo.isComplete; }
            else if (filter == "COMPLETED") { return todo.isComplete; }
            else { return true; }
          }).sort((a, b) => b.todoId - a.todoId).map((todo, todoIndex) => {
            return (
              <Todo 
                todo={todo}
                key={todoIndex}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
                onDecreaseTodoCount={onDecreaseTodoCount}
                onClickOpenUpdateModal={onClickOpenUpdateModal} />
            );
          })
          : null
        }
      </ul>
    </section>
  );
}

export default TodoList;