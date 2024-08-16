import { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Dashboard } from "./components/pages/dashboard";
import "./App.css";
import { Login } from "./components/pages/login";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />
      </Routes>

    </AppContainer>
  );
};

export default App;
