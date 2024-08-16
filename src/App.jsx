import { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Dashboard } from "./components/pages/dashboard";
import "./App.css";
import { Login } from "./components/pages/Login";
import { RegisterPage } from "./components/pages/registerPage";

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
    // // Recupera o token do localStorage
    // const token = localStorage.getItem("token");

    // // Verifica se o token existe e se é válido
    // if (token) {
    //   try {
    //     // Verifique o token com a chave secreta
    //     // const decoded = jwt.verify(token, "segredo-top");
    //     // Se o token é válido, autentica o usuário e redireciona para o dashboard
    //     setIsAuthenticated(true);
    //     // navigate("/dashboard");
    //   } catch (error) {
    //     console.error("Token inválido ou expirado:", error);
    //     // Se o token for inválido ou expirado, redireciona para a página de login
    //     setIsAuthenticated(false);
    //     // navigate("/");
    //   }
    // } else {
    //   // Se não houver token, redireciona para a página de login
    //   setIsAuthenticated(false);
    //   // navigate("/");
    // }

    if (!isAuthenticated && window.location.pathname == "/dashboard") {
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