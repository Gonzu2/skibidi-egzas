import { useState } from "react";
import { useAuth } from "../utils/context/authContext";
import "../login.css";
import LoginPage from "./LoginPage";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { handleRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = () => {
    handleRegister({ email, name, password });
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
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <input type="button" value="Register" onClick={onSubmit} />
          </li>
        </ul>
        <div>Already have account?</div>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
