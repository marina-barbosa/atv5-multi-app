// Contexto para gerenciamento do estado do usuário na aplicação. Fornece o estado do usuário atual, função para atualizar o estado e verificar o token JWT.
import { createContext, useState, useEffect, useContext } from 'react';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Função para buscar e verificar o usuário atual com base no token JWT armazenado.
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        // Primeiro, tenta decodificar como um token do Google
        const JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

        const { payload } = await jwtVerify(token, JWKS, {
          issuer: "https://accounts.google.com",
          audience: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Verifica se o token é para o meu Client ID
        });

        // Se a verificação for bem-sucedida, define o usuário atual
        setCurrentUser(payload.email); // Usa o e-mail do Google
      } catch (error) {
        console.warn("Não é um token do Google, tentando decodificar com o segredo local...");

        try {
          // Se a verificação com o Google falhar, tenta decodificar como um token do seu app
          const secret = new TextEncoder().encode("segredo-top");
          const { payload } = await jwtVerify(token, secret);

          // Se a verificação for bem-sucedida, define o usuário atual
          setCurrentUser(payload.username); // Usa o username do seu app
        } catch (error) {
          console.error("Token inválido ou expirado:", error);
          localStorage.removeItem("authToken"); // Remove o token se for inválido 
          setCurrentUser(null);
        }
      }
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
