import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadFromLocalStorage, saveToLocalStorage } from "../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = loadFromLocalStorage("users") || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      saveToLocalStorage("currentUser", user);
      navigate("/todolist");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="auth-button" onClick={handleLogin}>
        Login
      </button>
      <p className="back-link" onClick={() => navigate("/")}>
        뒤로가기
      </p>
    </div>
  );
};

export default Login;
