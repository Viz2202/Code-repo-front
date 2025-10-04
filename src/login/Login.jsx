import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { backendURL } from "../../request";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    await axios
      .post(`${backendURL}/login`, data)
      .then((response) => {
        const userInfo = response.data
        sessionStorage.setItem("userId", userInfo.user_id);
        sessionStorage.setItem("userName", userInfo.github_username);
        navigate('/repos');
      })
      .catch((err) => {});
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
