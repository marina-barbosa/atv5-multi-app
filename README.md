


# Atividade 5, MultiApp

Este é um projeto da ativdade 5 do curso da MaisPraTi.

## Requisitos
- Node.js 
- npm 

## Passos para Iniciar o Projeto
1. **Clone o Repositório**

```
   git clone git@github.com:marina-barbosa/
```

2. **Navegue até a pasta**

```
   cd atv5-multi-app
```

3. **Crie o Arquivo .env**

No diretório raiz do projeto, crie um arquivo chamado .env e adicione a variável de ambiente para o Google Client ID:

```
VITE_GOOGLE_CLIENT_ID=seu_client_id_aqui
```


Substitua seu_client_id_aqui pelo ID do cliente do Google obtido na Google Cloud Console.

4. **Instale as Dependências**

```
npm install
```

5. **Inicie o Servidor JSON**

Em um terminal separado, execute o comando para iniciar o servidor JSON simulado:

```
npm run json-server
```
Certifique-se de que o json-server está configurado corretamente no package.json para apontar para o arquivo db.json.

6. **Inicie o Servidor de Desenvolvimento**

Em outro terminal, execute o comando para iniciar a aplicação React:

```
npm run dev
```
7. **Acesse a Aplicação**

Abra o navegador e acesse http://localhost:5173/ para visualizar a aplicação.

Notas
Certifique-se de que todas as variáveis de ambiente estão configuradas corretamente antes de iniciar o projeto.
O servidor JSON deve estar em execução enquanto você desenvolve ou testa a aplicação.