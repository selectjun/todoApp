import React from "react";

const TodoFooter = (props) => {
  return (
    props.todoCount
    ? <footer className="footer">
      <span className="todo-count">
        <strong>{props.todoCount}</strong> item left
      </span>
      <ul className="filters">
        <li>
          <a href="" className="selected">All</a>
        </li>
        <li>
          <a href="">Active</a>
        </li>
        <li>
          <a href="">Completed</a>
        </li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
    : null
  );
}

export default TodoFooter;