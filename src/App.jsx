import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { Dashboard } from "./components/pages/dashboard";
import "./App.css";
import { Login } from "./components/pages/Login";
import { RegisterPage } from "./components/pages/registerPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider, useUser } from "./context/UserContext";


const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;

const App = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  return (
    <AppContainer>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard"
          element={currentUser ? <Dashboard /> : <Login />} />
      </Routes>

    </AppContainer>
  );
};

const AppWithProvider = () => (
  <UserProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider >
  </UserProvider>
);

export default AppWithProvider;