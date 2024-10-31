import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getUserOnLoad(token);
    } else {
      setUser(null);
      setLoading(false);
      navigate("/login");
    }
  }, []);
  useEffect(() => {}, [allUsers]);

  async function getUserOnLoad(token) {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:4001/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUser(response.data);
      } else {
        handleLogout();
      }
    } catch (err) {
      console.log(err);
      handleLogout();
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    Cookies.remove("token");
    setUser(null);
    navigate("/");
  }

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4001/user/all", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function handleLogin(user) {
    try {
      const response = await axios.post(
        "http://localhost:4001/user/login",
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Cookies.remove("token");
        Cookies.set("token", response.data.token);
        setUser(response.data);
        navigate("/");
      }
    } catch (error) {
      if (error.status === 403) {
        alert("Account blocked");
      } else if (error.status === 400) {
        alert("Invalid email/password");
      } else {
        console.log(`Unexpected response: `, error.response);
      }
    }
  }

  async function handleRegister(user) {
    try {
      const response = await axios.post(
        "http://localhost:4001/user/register",
        user
      );
      console.log(response);
      if (response.status == 201) {
        setUser(response.data);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log("Fill all the fields");
      } else if (error.response.status === 401) {
        console.log("User already exists");
      } else if (error.response.status === 402) {
        console.log("Wrong user data");
      } else {
        console.log(
          `Unexpected response: ${error.response.status}`,
          error.response
        );
      }
    }
  }
  
  async function blockUser(user,id) {
    try {
      const response = await axios.put(
        `http://localhost:4001/user/${eventId}`,
        JSON.stringify(updatedData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Successfully updated event", response);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error updating event:", error);
    }
  }

  const contextData = useMemo(() => ({
    getUserOnLoad,
    handleLogout,
    handleLogin,
    handleRegister,
    getAllUsers,
    blockUser,
    allUsers,
    user,
    loading,
  }));

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
