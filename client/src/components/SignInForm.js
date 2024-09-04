import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../URL/URL";

export const SignInForm = () => {
  const [value, setValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve email and password from localStorage
    const storedEmail = localStorage.getItem("email") || "";
    const storedPassword = localStorage.getItem("password") || "";
    setValue({ email: storedEmail, password: storedPassword });
  }, []);

  const login = async () => {
    try {
      const response = await fetch(URL + "login", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
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
      } else if (json.adminID) {
        setValue({ email: "", password: "" });
        localStorage.setItem("adminID", json.adminID);
        // Clear email and password from localStorage after successful login
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        navigate("/addtask");
      } else if (json.message === "password") {
        alert("Password incorrect");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.email !== "" && value.password !== "") {
      login();
    } else {
      alert("please fill are required inputs");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm flex">
      <input
        type="text"
        value={value.email}
        onChange={(e) => setValue({ ...value, email: e.target.value })}
        className="sign-input"
        placeholder="Enter your E-mail"
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
          style={{
            borderRadius: "10px",
            color: "black",
          }}
          type="submit"
          className="todo-btn"
        >
          Sign in
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <p style={{ color: "white", fontWeight: "bold" }}>OR</p>
        </div>
        <button
          style={{ borderRadius: "10px", color: "black" }}
          type="button" // Changed to type="button"
          className="todo-btn"
          onClick={() => navigate("/signup")}
        >
          Register
        </button>
      </div>
    </form>
  );
};
