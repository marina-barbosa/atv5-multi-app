
import styled from "styled-components";
import {
  FaArrowLeft,
} from "react-icons/fa";
import QRCodeGenerator from "./QRCodeGenarator";
import IPAddressFinder from "./IPAddressFinder";
import MovieSearchEngine from "./MovieSearchEngine";
import TodoApp from "./TodoApp";
import QuizApp from "./QuizApp";
import LanguageTranslator from "./LanguageTranslator";
import { CarouselComponent } from "./carousel";

// Estiliza o conteúdo principal do aplicativo.
const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;



// Estiliza o botão de retorno.
const ReturnButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;


export const Content = ({ currentComponent, carouselIndex, handleAccess }) => {
  const handleReturn = () => {
    handleAccess(null, null);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "QRCodeGenerator":
        return <QRCodeGenerator />;
      case "IPAddressFinder":
        return <IPAddressFinder />;
      case "MovieSearchEngine":
        return <MovieSearchEngine />;
      case "TodoApp":
        return <TodoApp />;
      case "QuizApp":
        return <QuizApp />;
      case "LanguageTranslator":
        return <LanguageTranslator />;
      default:
        return null;
    }
  };

  return (
    <MainContent>
      {currentComponent ? (
        <>
          {renderComponent()}
          <ReturnButton onClick={handleReturn}>
            <FaArrowLeft /> Return
          </ReturnButton>
        </>
      ) : (
        <CarouselComponent
          carouselIndex={carouselIndex}
          handleAccess={handleAccess}
        />
      )}
    </MainContent>
  );
};
