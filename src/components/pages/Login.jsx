import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import { useNavigate } from 'react-router-dom';
import { SignJWT } from 'jose';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from "../../context/UserContext";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 351px;
  height: auto;

  h2 {
    margin-top: 0;
  }
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 222px;
`;

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser, fetchCurrentUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users?username=${username}`);
      const data = await response.json();

      if (data.length > 0 && data[0].password === password) {
        setError('');
        const token = await tokenGenerator(data[0].username, data[0].id);
        // Armazenar o token no localStorage
        localStorage.setItem('authToken', token);
        setCurrentUser(data[0].username); // Atualiza o contexto com o username
        navigate("/dashboard");
      } else {
        setError('Username e/ou senha incorretos. Por favor, tente novamente.');
      }
    } catch (err) {
      setError('Erro ao tentar logar. Por favor, tente novamente mais tarde.');
    }
  };
  // Gerar um token JWT usando jose
  const tokenGenerator = async (username, userId) => {
    const token = await new SignJWT({ username: username, userId: userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode('segredo-top'));
    return token;
  }

  const handleGoogleSubmit = async (response) => {
    const { credential } = response;
    // Armazenar o token JWT do Google no localStorage
    localStorage.setItem('authToken', credential);
    await fetchCurrentUser();
    navigate("/dashboard");
  }

  const handleLoginError = (error) => {
    console.error('Google login error:', error);
    setError('Erro ao realizar login com o Google. Por favor, tente novamente.');
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonContainer>
          <Button
            type="submit"
            text="Login"
            $bgColor="#007bff"
            $hoverColor="#0056b3"
            $textColor="white"
          >
            Entrar
          </Button>
          <GoogleLogin
            onSuccess={handleGoogleSubmit}
            onError={handleLoginError}
          />
          <Button
            type="button"
            onClick={handleRegisterClick}
            text="Criar Conta"
            $bgColor="#28a745"
            $hoverColor="#218838"
            $textColor="white"
          >
            Criar Conta
          </Button>

        </ButtonContainer>
      </LoginForm>
    </LoginContainer>
  );
};
