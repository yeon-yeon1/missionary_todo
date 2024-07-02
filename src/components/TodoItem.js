import React from "react";
import "./TodoItem.css";

const TodoItem = ({ todo, onDelete }) => {
  return (
    <li className={todo.isComplete ? "complete" : ""}>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
