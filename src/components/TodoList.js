import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(loadFromLocalStorage("currentUser"));
  const [todos, setTodos] = useState(currentUser ? currentUser.todos : []);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setCurrentUser(loadFromLocalStorage("currentUser"));
  }, []);

  useEffect(() => {
    if (currentUser) {
      saveToLocalStorage("currentUser", { ...currentUser, todos });
      const users = loadFromLocalStorage("users") || [];
      const updatedUsers = users.map((user) => (user.email === currentUser.email ? { ...user, todos } : user));
      saveToLocalStorage("users", updatedUsers);
    }
  }, [todos, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleAddTodo = () => {
    const newTodoItem = {
      ...newTodo,
      _id: Date.now().toString(),
      isComplete: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo({ title: "", description: "" });
    setShowInput(false);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const handleLogout = () => {
    saveToLocalStorage("currentUser", null);
    setCurrentUser(null);
    navigate("/");
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="todo-container">
      <div className="header-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <h1 className="todolisth1">Todo List</h1>
      </div>
      <div className="todo-list-container">
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} onDelete={handleDeleteTodo} />
          ))}
        </ul>
        {showInput && (
          <div>
            <input type="text" name="title" placeholder="Title" value={newTodo.title} onChange={handleInputChange} />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newTodo.description}
              onChange={handleInputChange}
            />
            <button className="save-button" onClick={handleAddTodo}>
              Save
            </button>
          </div>
        )}
        {!showInput && (
          <button className="add-todo-button" onClick={() => setShowInput(true)}>
            + Add Todo
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;
