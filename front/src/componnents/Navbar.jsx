import { useEffect, useState } from "react";
import { useAuth } from "../utils/context/authContext";
import { useNavigate } from "react-router-dom";
import "../style/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, handleLogout, loading } = useAuth();

  return (
    <nav id="navbar">
      <div id="header-navbar">
        <p>Local events</p>
        <div id="admin-navbar" onClick={() => navigate("/")}>
          Home
        </div>
        {user && user.authenticationLevel === "admin" && !loading ? (
          <div id="admin-navbar" onClick={() => navigate("/admin")}>
            Admin dashboard
          </div>
        ) : (
          <></>
        )}
      </div>
      <div id="logout-navbar">
        {user && !loading ? <div>{user.name}</div> : <></>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
