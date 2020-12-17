import React from "react";

const TodoFooter = ({
  filter,
  todoCount,
  onChangeFilter
}) => {
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
      <button className="clear-completed">Clear completed</button>
    </footer>
    : null
  );
}

export default TodoFooter;