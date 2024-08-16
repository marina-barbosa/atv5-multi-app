import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: ${({ textColor }) => textColor || 'white'};
  background-color: ${({ bgColor }) => bgColor || '#007bff'};
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || '#0056b3'};
  }
`;

export const Button = ({ children, onClick, bgColor, hoverColor, textColor }) => {
  return (
    <StyledButton
      bgColor={bgColor}
      hoverColor={hoverColor}
      textColor={textColor}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

