import React from "react";

import Todo from "./Todo";

const TodoList = ({
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
          ? todoList.map((todo, todoIndex) => {
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