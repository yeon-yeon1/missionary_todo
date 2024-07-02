import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h1 className="home-todo">Todo List</h1>
      <div className="home">
        <button className="login-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="register-button" onClick={() => navigate("/register")}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Home;
