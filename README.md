
# Automação API Keeggo

Este projeto é uma automação de testes para as APIs da Keeggo, utilizando o Cypress. O objetivo é validar funcionalidades de tokenização de cartões com diferentes cenários, como tokenização válida, tokenização inválida e validações de segurança. A estrutura segue o padrão **POJO (Plain Old Java Object)** para melhor organização e reutilização de código.

## Estrutura do Projeto

- **.github/workflows**: Contém a configuração da pipeline de CI usando GitHub Actions.
- **cypress/e2e**: Contém os testes de integração, como `tokenizacao.spec.cy.js`.
- **cypress/fixtures**: Contém dados estáticos usados nos testes, como `example.json`.
- **cypress/support/utils**: Contém utilitários e classes de apoio para a automação, como:
  - `auth.js`: Faz requisições para gerar tokens de autenticação.
  - `AuthToken.js`: Classe que manipula tokens de autenticação.
  - `CardData.js`: Classe que estrutura os dados do cartão a serem testados.
  - `tokenization.js`: Funções que fazem requisições de tokenização de cartões com e sem tokens.

## Configuração do Ambiente

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Clone este repositório em sua máquina local:

   ```bash
   git clone https://github.com/seuusuario/seuprojeto.git
   cd seuprojeto
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Instale a versão correta do Cypress, se necessário:

   ```bash
   npm install cypress@13.6.2 --save-dev
   ```

## Executando os Testes

Para rodar os testes, utilize um dos comandos abaixo:

- Para abrir a interface gráfica do Cypress:

  ```bash
  npx cypress open
  ```

- Para rodar os testes em modo headless (pipeline):

  ```bash
  npx cypress run
  ```

## Estrutura dos Principais Arquivos

### `auth.js`

Este arquivo contém a função `getAuthToken`, que faz uma requisição para obter um token de autenticação utilizando o fluxo de credenciais de cliente:

```javascript
cy.request({
  method: 'POST',
  url: authUrl,
  form: true,
  body: {
    grant_type: 'client_credentials',
    client_id: clientID,
    client_secret: clientSecret
  }
})
```

### `tokenization.js`

Contém funções para testar diferentes cenários de tokenização de cartões:

- `tokenizeCardInvalid`: Tokeniza um cartão com dados inválidos.
- `tokenizeCardWhitoutToken`: Tokeniza um cartão sem passar um token de autenticação.

### `tokenizacao.spec.cy.js`

Este arquivo contém os cenários de testes para validar as funcionalidades de tokenização da API. Um exemplo de teste de tokenização:

```javascript
it('Validar tokenização de cartão', () => {
  const cardData = new CardData('515550122280001', '12345678900', '12', '24', '123', 'Mastercard');
  tokenizeCard(authToken, cardData).then((response) => {
    expect(response.status).to.eq(200);
  });
});
```

## Pipeline de CI com GitHub Actions

Este projeto utiliza GitHub Actions para rodar os testes de forma automatizada a cada novo push na branch `master`. O arquivo da pipeline está localizado em `.github/workflows/cypress.yml`.

### Passos da Pipeline:

1. **Checkout**: Faz o checkout do código do repositório.
2. **Instalação do Node.js**: Configura o ambiente com a versão correta do Node.js.
3. **Instalação de Dependências**: Instala as dependências definidas no `package.json`.
4. **Execução dos Testes**: Roda os testes utilizando Cypress.

## Dependências

As principais dependências usadas neste projeto incluem:

- **Cypress**: ^13.6.2
- **Node.js**: ^14.x

## Contribuindo

Sinta-se à vontade para fazer um fork do repositório e enviar PRs com melhorias e correções. Para sugestões e reportar problemas, utilize a aba de [Issues](https://github.com/seuusuario/seuprojeto/issues).

## Licença

Este projeto é licenciado sob a licença ISC.
