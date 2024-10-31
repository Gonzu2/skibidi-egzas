import { useState } from "react";
import { useAuth } from "../utils/context/authContext";
import { useNavigate } from "react-router-dom";
import "../login.css";
import RegisterPage from "./RegisterPage";

function LoginPage() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    handleLogin({ email, password });
  };
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-second-wrapper">
        <ul className="login-list">
          <li>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="button" value="Log in" onClick={onSubmit}>
              Log in
            </button>
          </li>
        </ul>
        <div className="login-extra">
          <div>Don't have account? </div>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
