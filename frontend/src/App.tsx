import { Route, Routes, Navigate } from "react-router-dom";
import { Register } from "./views/Register";
import { checkAuth } from "./util/auth";
import { Login } from "./views/Login";
import Home from "./views/Home";
import "./App.css";
import { createStore } from "little-state-machine";

const App: React.FC = () => {
  const { isAuthenticated } = checkAuth();
  createStore({});

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
      <Route
        path="/register"
        element={isAuthenticated ? <Home /> : <Register />}
      />

      {/* Define the protected route using route nesting */}
      <Route
        path="/*"
        element={
          isAuthenticated ? <Home /> : <Navigate to="/login" replace={true} />
        }
      />
    </Routes>
  );
};

export default App;
