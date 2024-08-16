
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
import { Button } from "./button";

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
          <Button
            onClick={handleReturn}
            $bgColor="#007bff"
            $hoverColor="#0056b3"
            $textColor="white"
          >
            <FaArrowLeft style={{ marginRight: '8px' }} /> Return
          </Button>
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
