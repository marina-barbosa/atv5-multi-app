Objetivo:

O objetivo deste projeto é aprimorar o código do front-end do repositório https://github.com/jhyago/maisPraTi/tree/main/module04/atv5/multi-app.

Vocês deverão aplicar melhorias em várias áreas, incluindo arquitetura, autenticação, trabalho com JSON e qualidade de código. Este projeto permitirá que vocês pratiquem e desenvolvam habilidades essenciais em desenvolvimento front-end.

Requisitos Mínimos:

Arquitetura:

- Modularização: Reestruture o código em módulos distintos para melhorar a manutenção e a legibilidade. Separe componentes, páginas, serviços e utilitários.


- Tratamento de Erros: Melhore o tratamento de erros, garantindo que o aplicativo lide com erros de forma clara e amigável para o usuário.

Autenticação:

- JWT (JSON Web Tokens): Implemente JWT para autenticação. Proteja rotas sensíveis no front-end e implemente mecanismos básicos de renovação de tokens.

Validação de Dados: Valide os dados JSON recebidos e enviados para garantir que estejam corretos e completos.
Interação com API: Melhore a interação com APIs, garantindo que as requisições sejam eficientes e seguras.

Qualidade de Código e Melhores Práticas:
Revisões de Código: Estabeleça um processo de revisão de código para garantir qualidade e consistência.

Documentação: Melhore a documentação do código utilizando comentários claros e mantendo um README detalhado.
Desempenho e Escalabilidade



Diferenciais extras e opcionais:
- Uso de Padrões de Projeto: Aplique padrões de projeto simples como Singleton e Factory onde for adequado.

- OAuth2: Se possível, integre autenticação com provedores de identidade de terceiros (Google, Facebook, etc.).

Cache: Implemente cache no front-end para melhorar a performance, armazenando dados frequentemente acessados no localStorage ou sessionStorage.

Lazy Loading: Utilize lazy loading para carregar componentes e recursos sob demanda, melhorando o tempo de carregamento inicial da aplicação.

Exemplos de Melhoria Específica:
- Substituição de APIs: OMDB para TMDB: Se você está utilizando a API do OMDB para buscar informações sobre filmes, considere substituir pela API do TMDB, que oferece mais funcionalidades e dados.

    OMDB API: http://www.omdbapi.com/?apikey=[sua_api_key]&s=filme
    TMDB API: https://api.themoviedb.org/3/search/movie?api_key=[sua_api_key]&query=filme
    A mudança pode envolver alterações na estrutura das respostas e nos componentes que exibem os dados.

Melhorias no Todo App

- Funcionamento sem JSON Server: Modifique o todo app para funcionar sem o JSON Server, utilizando LocalStorage para persistência dos dados.