import React from "react";

import Todo from "./Todo";

const TodoList = (props) => {
  return (
    <section className="main">
      <ul className="todo-list">
        {
          props.todoList
          ? props.todoList.map((todo, todoIndex) => {
            return (
              <Todo 
                todo={todo}
                key={todoIndex}
                deleteTodo={props.deleteTodo}
                completeTodo={props.completeTodo}
                decreaseTodoCount={props.decreaseTodoCount} />
            );
          })
          : null
        }
      </ul>
    </section>
  );
}

export default TodoList;