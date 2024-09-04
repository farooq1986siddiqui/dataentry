import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [topic, setTopic] = useState(task.topic || "");
  const [name, setName] = useState(task.name || "");
  const [email, setEmail] = useState(task.email || "");
  const [address, setAddress] = useState(task.address || "");
  const [country, setCountry] = useState(task.country || "");

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit todo with all fields
    editTodo(task._id, topic, name, email, address, country);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="todo-input"
        placeholder="Update topic"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="todo-input"
        placeholder="Update name"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="todo-input"
        placeholder="Update email"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="todo-input"
        placeholder="Update address"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="todo-input"
        placeholder="Update country"
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
