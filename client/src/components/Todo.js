import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      {/* Highlighted - Display the new fields */}
      <p
        className={`${task.completed ? "completed" : ""}`}
        onClick={() => toggleComplete(task._id, task.completed)}
      >
        {task.topic}
      </p>
      <p
        className={`${task.completed ? "completed" : ""}`}
        onClick={() => toggleComplete(task._id, task.completed)}
      >
        {task.name}
      </p>
      <p
        className={`${task.completed ? "completed" : ""}`}
        onClick={() => toggleComplete(task._id, task.completed)}
      >
        {task.email}
      </p>
      <p
        className={`${task.completed ? "completed" : ""}`}
        onClick={() => toggleComplete(task._id, task.completed)}
      >
        {task.address}
      </p>
      <p
        className={`${task.completed ? "completed" : ""}`}
        onClick={() => toggleComplete(task._id, task.completed)}
      >
        {task.country}
      </p>

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
