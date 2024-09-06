import React, { useEffect, useState } from "react";
import { Todo } from "../components/Todo";
import { TodoForm } from "../components/TodoForm";
import { EditTodoForm } from "../components/EditTodoForm";
import URL from "../URL/URL";
import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const signouts = () => {
    localStorage.removeItem("adminID");
    navigate("/");
  };

  const fetchTodo = async (page = 1) => {
    try {
      const response = await fetch(URL + "gettodo", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          page,
          limit: 12, // Define your limit here (e.g., 10 items per page)
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
      } else {
        setTodos(json.tasks);
        setCurrentPage(json.currentPage);
        setTotalPages(json.totalPages);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("adminID")) {
      navigate("/");
    } else {
      fetchTodo(currentPage);
    }
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const addTodo = async (topic, name, email, address, country) => {
    try {
      const response = await fetch(URL + "addtask", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          topic,
          name,
          email,
          address,
          country,
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
      } else {
        console.log(json);
        if (json.message === "Email already exists") {
          return alert("Email already exists");
        } else {
          // Prepend the new task to the beginning of the list
          setTodos([json, ...todos]);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const editTask = async (id, topic, name, email, address, country) => {
    try {
      const response = await fetch(URL + "updatetask", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          id: id,
          topic: topic,
          name: name,
          email: email,
          address: address,
          country: country,
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
      } else {
        console.log(json);
        fetchTodo(currentPage);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Other methods remain unchanged
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(URL + "deletetask", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          id: id,
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
      } else {
        console.log(json);
        fetchTodo();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await fetch(URL + "completetask", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          adminID: localStorage.getItem("adminID"),
          id: id,
          completed,
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
      } else {
        console.log(json);
        fetchTodo();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <>
      <div className="TodoWrapper">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "4px",
          }}
        >
          <button
            className="todo-btn"
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "red",
              borderRadius: "10px",
              marginRight: "20px", // Adds space between the button and the h1 tag
            }}
            onClick={(e) => signouts()}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
          <h1>Get Things Done!</h1>
        </div>

        <TodoForm addTodo={addTodo} />
        {console.log(todos)}

        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <>
              <Todo
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
              />
            </>
          )
        )}

        <div className="pagination-controls">
          <button
            onClick={handlePreviousPage}
            // disabled={currentPage === 1}
          >
            Previous
          </button>
          <span
            style={{ marginLeft: "8px", marginRight: "8px", color: "white" }}
          >
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            // disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
