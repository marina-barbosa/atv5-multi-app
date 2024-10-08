import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../button';
// Estilização com styled-components
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const RegisterForm = styled.form`
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
`;
// Componente para a página de registro de usuários. Permite aos usuários se registrarem, verificando a disponibilidade do nome de usuário e exibindo mensagens de erro ou sucesso.
export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  //Verifica a disponibilidade do nome de usuário.
  const checkUsernameAvailability = async (username) => {
    const response = await fetch(`http://localhost:3000/users?username=${username}`);
    const data = await response.json();
    return data.length === 0; // Retorna true se o nome de usuário está disponível
  };
  //Manipula o envio do formulário de registro.
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Verificar se o nome de usuário está disponível
      const isAvailable = await checkUsernameAvailability(username);

      if (!isAvailable) {
        setError('Nome de usuário já em uso. Por favor, escolha outro.');
        return;
      }

      if (username === '' || password === '') {
        setError('Todos os campos são obrigatórios.');
        return;
      }

      // Enviar os dados para o backend de mentirinha
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar a conta.');
      }

      setSuccess('Conta criada com sucesso!');
      setError('');

      // Redirecionar para a página de login após 2 segundos
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setError('Erro ao criar a conta. Por favor, tente novamente.');
    }
  };
  // Redireciona para a página de login
  const handleGoToLogin = async (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleRegister}>
        <h2>Criar Conta</h2>
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
        {success && <p style={{ color: '#28a745' }}>{success}</p>}
        <ButtonContainer>
          <Button
            type="submit"
            text="Registrar"
            $bgColor="#28a745"
            $hoverColor="#218838"
            $textColor="white"
          >
            Registrar
          </Button>
          <Button
            type="button"
            onClick={handleGoToLogin}
            text="Voltar para Login"
            $bgColor="#007bff"
            $hoverColor="#0056b3"
            $textColor="white"
          >
            Voltar
          </Button>
        </ButtonContainer>
      </RegisterForm>
    </RegisterContainer>
  );
};
