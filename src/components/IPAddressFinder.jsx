import { useState } from 'react'; // Importa o hook useState do React
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP
import styled from 'styled-components'; // Importa styled-components para estilizar os componentes
import { Button } from './button';

// Define o estilo do container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 50px auto;
`;

// Define o estilo do título
const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

// Define o estilo do campo de entrada
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



// Define o estilo do container de resultados
const ResultsContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
`;


// Define o estilo do container de erro
const ErrorContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
`;

// Componente principal IPAddressFinder
const IPAddressFinder = () => {
  const [ip, setIp] = useState(''); // Define o estado para o IP digitado pelo usuário
  const [ipData, setIpData] = useState(null); // Define o estado para armazenar os dados do IP
  const [error, setError] = useState(''); // Define o estado para armazenar mensagens de erro

  // Função para buscar os dados do IP
  const findIP = async () => {
    setError(''); // Limpa a mensagem de erro antes de iniciar a busca
    try {
      if (!ip) {
        setError('Por favor, insira um endereço IP.');
        return;
      }
      const url = `https://ipinfo.io/${ip}/json`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setIpData(response.data);
      } else {
        setError('Falha ao buscar dados do endereço IP.');
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        setError('Desative o Bloqueador de Anúncios');
      } else {
        setError('Ocorreu um erro ao buscar dados de endereço IP.');
      }
      console.error("Erro ao buscar dados do endereço IP:", error);
    }
  };

  return (
    <Container>
      <Title>IP Address Finder</Title>
      <Input
        type="text"
        value={ip} // Valor do campo de entrada é ligado ao estado ip
        onChange={(e) => setIp(e.target.value)} // Atualiza o estado ip conforme o usuário digita
        placeholder="Enter IP address" // Placeholder do campo de entrada
      />

      <Button
        onClick={findIP}
        $bgColor="#007bff"
        $hoverColor="#0056b3"
        $textColor="white"
      >Find IP</Button>

      {error && ( // Exibe a mensagem de erro se houver algum erro
        <ErrorContainer>
          <p>{error}</p>
        </ErrorContainer>
      )}

      {ipData && ( // Condicional que exibe os dados do IP se ipData não for null
        <ResultsContainer>
          <p><strong>IP:</strong> {ipData.ip}</p>
          <p><strong>Location:</strong> {ipData.city}, {ipData.region}, {ipData.country}</p>
          <p><strong>ISP:</strong> {ipData.org}</p>
        </ResultsContainer>
      )}
    </Container>
  );
};

export default IPAddressFinder; // Exporta o componente IPAddressFinder como padrão
