import styled from 'styled-components';
import { Content } from '../content';
import { Footer } from '../footer';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../navbar';
import { useUser } from '../../context/UserContext';
// Estilização com styled-components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;
//Componente principal do dashboard da aplicação. Exibe a navegação, conteúdo principal e rodapé, e gerencia o estado do componente atual e do índice do carrossel.
export const Dashboard = () => {
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { setCurrentUser } = useUser(); // Use o contexto
  // Manipula o acesso ao componente selecionado e atualiza o índice do carrossel.
  const handleAccess = (index, component) => {
    setCarouselIndex(index);
    setCurrentComponent(component);
  };
  //Realiza o logout do usuário, removendo o token JWT do localStorage e redirecionando para a página de login.
  const handleLogout = () => {    
    localStorage.removeItem('authToken'); // Remove o token JWT do localStorage
    setCurrentUser(null) // Atualiza o estado de autenticação
    navigate("/"); // Redireciona o usuário para a página de login
  };

  return (
    <DashboardContainer>
      <MainContentContainer>
        <Navbar handleAccess={handleAccess} handleLogout={handleLogout} />
        <Content
          currentComponent={currentComponent}
          carouselIndex={carouselIndex}
          handleAccess={handleAccess}
        />
      </MainContentContainer>
      <Footer />
    </DashboardContainer>
  );
};


