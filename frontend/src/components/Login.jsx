import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";
import "./Login.css";

const Login = ({ setUserLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUserLoggedIn(true);
      navigate("/boards");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Login</h2>

        <input
          className="auth-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={loginHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
