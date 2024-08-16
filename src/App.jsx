import { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Dashboard } from "./components/pages/dashboard";
import "./App.css";
import { Login } from "./components/pages/Login";
import { RegisterPage } from "./components/pages/registerPage";
import { jwtVerify } from "jose"; // Importa a função jwtVerify da biblioteca jose

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
    const verifyToken = async () => {
      // Recupera o token do localStorage
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          // Verifica o token com a chave secreta "segredo-top"
          const secret = new TextEncoder().encode("segredo-top");
          await jwtVerify(token, secret);

          // Se o token for válido, autentica o usuário
          setIsAuthenticated(true);
          navigate("/dashboard");
        } catch (error) {
          console.error("Token inválido ou expirado:", error);
          setIsAuthenticated(false);
          localStorage.removeItem("authToken"); // Remove o token inválido
        }
      }

      if (!isAuthenticated && window.location.pathname === "/dashboard") {
        navigate("/");
      }
    };

    verifyToken();
  }, [isAuthenticated, navigate]);




  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login onLogin={handleLogin} />}
        />
      </Routes>

    </AppContainer>
  );
};

export default App;