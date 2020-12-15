import React from "react";

import Todo from "./Todo";

const TodoList = (props) => {
  return (
    <ul className="todo-list">
      {
        props.todoList
        ? props.todoList.map((todo, todoIndex) => {
          return (
            <Todo 
              todo={todo}
              key={todoIndex}
              deleteTodo={props.deleteTodo}
              decreaseTodoCount={props.decreaseTodoCount} />
          );
        })
        : false
      }
    </ul>
  );
}

export default TodoList;