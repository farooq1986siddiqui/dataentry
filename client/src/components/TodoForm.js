import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    if (topic && name && email && address && country) {
      // Ensure all fields are filled
      // add todo
      addTodo(topic, name, email, address, country);
      // clear form after submission
      // setTopic("");
      setName("");
      setEmail("");
      setAddress("");
      setCountry("");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="todo-input-t"
        placeholder="Topic?"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="todo-input-n"
        placeholder="Name?"
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="todo-input-e"
        placeholder="Email?"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="todo-input-a"
        placeholder="Address?"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="todo-input-c"
        placeholder="Country?"
      />
      <button
        style={{
          fontSize: "15px",
          borderRadius: "25%",
          backgroundColor: "red",
          fontWeight: "bold",
          marginLeft: "6px",
        }}
        type="submit"
        className="todo-btn"
      >
        +
      </button>
    </form>
  );
};
