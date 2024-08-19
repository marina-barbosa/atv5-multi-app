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
  // Função para buscar tarefas do `localStorage` associadas ao usuário atual.
  const fetchTasks = useCallback(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    setTasks(storedTasks);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser, fetchTasks]);
  //Função para salvar tarefas no `localStorage`.
  const saveTasks = (updatedTasks) => {
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(updatedTasks));
  };
  // Função para adicionar uma nova tarefa. Adiciona a nova tarefa à lista e salva no `localStorage`. Exibe mensagem de erro se a tarefa estiver vazia.
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
  // Função para excluir uma tarefa. Remove a tarefa da lista e salva as mudanças no `localStorage`.
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };
  // Função para atualizar uma tarefa existente. Atualiza o texto da tarefa na lista e salva as mudanças no `localStorage`.
  const updateTask = (id) => {
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, text: editingTaskText } : task));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskText('');
  };
  // Função para iniciar a edição de uma tarefa. Define o ID da tarefa a ser editada e seu texto.
  const editTask = (id, text) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };
  // Exibe mensagem se o usuário não estiver logado
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
