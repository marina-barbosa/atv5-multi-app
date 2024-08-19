// Importa os hooks useState e useEffect da biblioteca React para gerenciar estado e efeitos colaterais.
import { useState, useEffect, useCallback } from 'react';
// Importa a biblioteca styled-components para criar componentes estilizados.
import styled from 'styled-components';
// Importa a biblioteca jose para decodificação do JWT
// import { createRemoteJWKSet, jwtVerify } from 'jose';
import { useUser } from '../context/UserContext';

// Cria um componente estilizado chamado Container usando styled-components.
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 50px auto;
`;

// Cria um componente estilizado chamado Title usando styled-components.
const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

// Cria um componente estilizado chamado Input usando styled-components.
const Input = styled.input`
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Cria um componente estilizado chamado Button usando styled-components.
const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Cria um componente estilizado chamado TaskList usando styled-components.
const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

// Cria um componente estilizado chamado TaskItem usando styled-components.
const TaskItem = styled.li`
  background: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition: background-color 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f1f1f1;
  }

  button {
    margin-left: 10px;
    background: transparent;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      color: darkred;
    }
  }
`;

// Cria um componente estilizado chamado EditInput usando styled-components.
const EditInput = styled.input`
  margin-left: 10px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 60%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 20px;
  text-align: center;
`;

// Define o componente funcional TodoApp.
const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [error, setError] = useState('');
  // const [currentUser, setCurrentUser] = useState('');
  const { currentUser } = useUser(); // Use o contexto

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     const token = localStorage.getItem("authToken");

  //     if (token) {
  //       try {
  //         // Primeiro, tenta decodificar como um token do Google
  //         const JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

  //         const { payload } = await jwtVerify(token, JWKS, {
  //           issuer: "https://accounts.google.com",
  //           audience: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Verifica se o token é para o seu Client ID
  //         });

  //         // Se a verificação for bem-sucedida, define o usuário atual
  //         setCurrentUser(payload.email); // Usa o nome ou e-mail do Google
  //       } catch (error) {
  //         console.warn("Não é um token do Google, tentando decodificar com o segredo local...");

  //         try {
  //           // Se a verificação com o Google falhar, tenta decodificar como um token do seu app
  //           const secret = new TextEncoder().encode("segredo-top");
  //           const { payload } = await jwtVerify(token, secret);

  //           // Se a verificação for bem-sucedida, define o usuário atual
  //           setCurrentUser(payload.username); // Usa o username do seu app
  //         } catch (error) {
  //           console.error("Token inválido ou expirado:", error);
  //           localStorage.removeItem("authToken"); // Remove o token inválido
  //         }
  //       }
  //     }
  //   };
  //   fetchCurrentUser();
  // }, []);

  const fetchTasks = useCallback(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    setTasks(storedTasks);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser, fetchTasks]);

  const saveTasks = (updatedTasks) => {
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (task) {
      const newTask = { id: Date.now(), text: task }; // Gerar um id único para a tarefa
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setTask('');
    } else {
      setError('A tarefa não pode estar vazia');
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const updateTask = (id) => {
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, text: editingTaskText } : task));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  const editTask = (id, text) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  if (!currentUser) {
    return <p>Você precisa estar logado para usar o Todo App.</p>;
  }

  return (
    <Container>
      <Title>Todo App</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            {editingTaskId === task.id ? (
              <EditInput
                type="text"
                value={editingTaskText}
                onChange={(e) => setEditingTaskText(e.target.value)}
                onBlur={() => updateTask(task.id)}
              />
            ) : (
              <>
                {task.text}
                <div>
                  <button onClick={() => editTask(task.id, task.text)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

export default TodoApp;
