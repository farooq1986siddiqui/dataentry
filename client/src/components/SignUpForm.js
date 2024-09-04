import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../URL/URL";

export const SignUpForm = () => {
  const [value, setValue] = useState({ email: "", username: "", password: "" });
  const navigate = useNavigate();

  const addUser = async () => {
    try {
      const response = await fetch(URL + "signup", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          username: value.username,
          email: value.email,
          password: value.password,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        credentials: "include",
      });

      const json = await response.json();
      if (json.message === "signout") {
        localStorage.removeItem("adminID");
        navigate("/");
      } else if (json.message === "done") {
        // Store email and password in localStorage
        localStorage.setItem("email", value.email);
        localStorage.setItem("password", value.password);

        setValue({ email: "", username: "", password: "" });
        alert("user added");
        navigate("/signin");
      } else if (json.message === "error") {
        alert("some error occurred");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.email !== "" && value.password !== "") {
      // Changed to && for both fields
      addUser();
    } else {
      alert("please fill are required inputs");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm flex">
      <input
        type="email"
        value={value.email}
        onChange={(e) => setValue({ ...value, email: e.target.value })}
        className="sign-input"
        placeholder="Enter your E-mail"
      />
      <input
        type="text"
        value={value.username}
        onChange={(e) => setValue({ ...value, username: e.target.value })}
        className="sign-input"
        placeholder="Enter your username"
      />
      <input
        type="password"
        value={value.password}
        onChange={(e) => setValue({ ...value, password: e.target.value })}
        className="sign-input"
        placeholder="Enter your Password"
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          style={{ borderRadius: "10px", width: "100%", color: "black" }}
          type="submit"
          className="todo-btn"
        >
          Register...
        </button>
      </div>
    </form>
  );
};
