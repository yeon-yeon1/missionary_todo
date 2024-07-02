import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = loadFromLocalStorage("users") || [];
    const newUser = { email, password, todos: [] };

    if (users.find((user) => user.email === email)) {
      alert("User already exists");
      return;
    }

    users.push(newUser);
    saveToLocalStorage("users", users);
    saveToLocalStorage("currentUser", newUser);
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>회원가입</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="auth-button" onClick={handleRegister}>
        회원가입
      </button>
      <p className="back-link" onClick={() => navigate("/")}>
        뒤로가기
      </p>
    </div>
  );
};

export default Register;
