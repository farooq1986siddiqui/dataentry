import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      {/* Highlighted - Display the new fields */}
      <div className="todo-topic">
        <p
          className={`${task.completed ? "completed" : ""}`}
          onClick={() => toggleComplete(task._id, task.completed)}
        >
          {task.topic}
        </p>
      </div>
      <div className="todo-name">
        <p
          className={`${task.completed ? "completed" : ""}`}
          onClick={() => toggleComplete(task._id, task.completed)}
        >
          {task.name}
        </p>
      </div>
      <div className="todo-email">
        <p
          className={`${task.completed ? "completed" : ""}`}
          onClick={() => toggleComplete(task._id, task.completed)}
        >
          {task.email}
        </p>
      </div>
      <div className="todo-address">
        <p
          className={`${task.completed ? "completed" : ""}`}
          onClick={() => toggleComplete(task._id, task.completed)}
        >
          {task.address}
        </p>
      </div>
      <div className="todo-country">
        <p
          className={`${task.completed ? "completed" : ""}`}
          onClick={() => toggleComplete(task._id, task.completed)}
        >
          {task.country}
        </p>
      </div>

      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task._id)}
        />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task._id)} />
      </div>
    </div>
  );
};
