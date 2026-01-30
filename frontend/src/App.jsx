import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Boards from "./components/Boards";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // auto-login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {isLoggedIn && (
        <button onClick={logoutHandler} style={{ float: "right" }}>
          Logout
        </button>
      )}

      <Routes>
        {/* DEFAULT → REGISTER */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/boards" /> : <Register />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/boards" />
            ) : (
              <Login setUserLoggedIn={setIsLoggedIn} />
            )
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/boards" /> : <Register />
          }
        />

        {/* BOARDS (PROTECTED) */}
        <Route
          path="/boards"
          element={
            isLoggedIn ? <Boards /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
