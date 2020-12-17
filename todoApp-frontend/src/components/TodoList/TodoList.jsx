import React from "react";

import Todo from "./Todo";

const TodoList = ({
  filter,
  todoList,
  deleteTodo,
  completeTodo,
  onDecreaseTodoCount
}) => {
  return (
    <section className="main">
      <ul className="todo-list">
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