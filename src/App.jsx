import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { Dashboard } from "./components/pages/dashboard";
import "./App.css";
import { Login } from "./components/pages/Login";
import { RegisterPage } from "./components/pages/registerPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider, useUser } from "./context/UserContext";

// Estilização com styled-components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;
/* 
Componente principal da aplicação. 
Configura as rotas e verifica se o usuário está autenticado. 
Se o usuário estiver autenticado, redireciona para a página do dashboard. 
Se não estiver autenticado, permite o acesso às páginas de login e registro. 
*/
const App = () => {
  const { currentUser } = useUser(); // Hook personalizado para obter o usuário atual do contexto
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    // Verifica se há um usuário atual e redireciona para a página do dashboard se tiver
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <AppContainer>
      <Routes>
        {/* Rota para a página de login */}
        <Route path="/" element={<Login />} />
        {/* Rota para a página de registro */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Rota para o dashboard; acessível apenas para usuários autenticados */}
        <Route path="/dashboard"
          element={currentUser ? <Dashboard /> : <Login />} />
      </Routes>
    </AppContainer>
  );
};
// Componente que inclui os provedores de contexto e autenticação. 
// Envolve o componente principal App com os provedores UserProvider e GoogleOAuthProvider para gerenciamento de contexto e autenticação via Google.
const AppWithProvider = () => (
  <UserProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider >
  </UserProvider>
);

export default AppWithProvider;