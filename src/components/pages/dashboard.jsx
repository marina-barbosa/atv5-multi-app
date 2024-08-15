import styled from 'styled-components';
import { Content } from '../content';
import { Footer } from '../footer';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../navbar';

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

export const Dashboard = () => {
  const [, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleAccess = (index, component) => {
    setCarouselIndex(index);
    setCurrentComponent(component);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
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


