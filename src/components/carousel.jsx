// CarouselComponent.js
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { Button } from "./button";

// Estiliza o contêiner do carrossel.
const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 70%;
  margin: auto;
  background-color: #2c3e50;
  border-radius: 20px;
  padding: 20px;
`;

// Estiliza os itens individuais do carrossel.
const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  width: 100%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: white;
  }

`;

// Estiliza o carrossel personalizado.
const CustomCarousel = styled(Carousel)`
  width: 100%;
  .carousel-status {
    display: none;
  }
`;

export const CarouselComponent = ({ carouselIndex, handleAccess }) => (
  <CarouselContainer>
    <CustomCarousel
      showArrows={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      selectedItem={carouselIndex}
      onChange={(index) => handleAccess(index, null)}
      showThumbs={false}
    >
      <CarouselItem>
        <h2>QR Code Generator</h2>
        <Button
          onClick={() => handleAccess(0, "QRCodeGenerator")}
          $bgColor="#007bff"
          $hoverColor="#0056b3"
          $textColor="white"
        >Acesse</Button>
      </CarouselItem>
      <CarouselItem>
        <h2>IP Address Finder</h2>
        <Button
          onClick={() => handleAccess(1, "IPAddressFinder")}
          $bgColor="#007bff"
          $hoverColor="#0056b3"
          $textColor="white"
        >Acesse</Button>
      </CarouselItem>
      <CarouselItem>
        <h2>Movie Search Engine</h2>
        <Button
          onClick={() => handleAccess(2, "MovieSearchEngine")}
          $bgColor="#007bff"
          $hoverColor="#0056b3"
          $textColor="white"
        >Acesse</Button>
      </CarouselItem>
      <CarouselItem>
        <h2>Todo App</h2>

        <Button
          onClick={() => handleAccess(3, "TodoApp")}
          $bgColor="#007bff"
          $hoverColor="#0056b3"
          $textColor="white"
        >Acesse</Button>
      </CarouselItem>
      <CarouselItem>
        <h2>Quiz App</h2>

        <Button
          onClick={() => handleAccess(4, "QuizApp")}
          $bgColor="#007bff"
          $hoverColor="#0056b3"
          $textColor="white"
        >Acesse</Button>
      </CarouselItem>
      <CarouselItem>
        <h2>Language Translator</h2>

        <Button
          onClick={() => handleAccess(5, "LanguageTranslator")}
          $bgColor="#007bff"
          $hoverColor="#0056b3"
          $textColor="white"
        >Acesse</Button>
      </CarouselItem>
    </CustomCarousel>
  </CarouselContainer>
);
