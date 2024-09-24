/// <reference types="cypress" />

import { CardData } from '../support/utils/CardData';
import { getAuthToken } from '../support/utils/auth';
import { tokenizeCard } from '../support/utils/tokenization';
import { tokenizeCardInvalid } from '../support/utils/tokenization';
import { tokenizeCardWhitoutToken } from '../support/utils/tokenization';
import { tokenizeCardInvalidToken } from '../support/utils/tokenization';

describe('Tokenização API', () => {
  let authToken;

  before(() => {
    getAuthToken().then((token) => {
      authToken = token.accessToken;
    });
  });


  it('Validar campos obrigatórios faltando', () => {
    const incompleteCardData = new CardData(
      null,
      "12345678900",
      "12",
      "24",
      null,
      "Mastercard"
    );

    cy.wrap(null).then(() => {
      expect(authToken).to.exist;

      tokenizeCardInvalid(authToken, incompleteCardData).then((response) => {
        // Validação do status code de erro
        expect(response.status).to.eq(400);

        // Validação da mensagem de erro
        expect(response.body.message).to.eq("Bad Request");
        expect(response.body.message).not.be.empty
      });
    });
  });

  it('Validar tokenização de cartão sem enviar token', () => {
    const cardData = new CardData(
      "5155901222280001",
      "12345678900",
      "12",
      "24",
      "123",
      "Mastercard"
    );

    cy.wrap(null).then(() => {
      expect(authToken).to.exist;

      tokenizeCardWhitoutToken(authToken, cardData).then((response) => {
        // Validação do status code
        expect(response.status).to.eq(401);

        // Validação dos campos obrigatórios
        expect(response.body.message).not.be.empty
        expect(response.body.message).to.eq("Unauthorized");

      });
    });
  });

  
  it('Validar tokenização de cartão com token invalido', () => {
    const cardData = new CardData(
      "5155901222280001",
      "12345678900",
      "12",
      "24",
      "123",
      "Mastercard"
    );

    cy.wrap(null).then(() => {
      expect(authToken).to.exist;

      tokenizeCardInvalidToken(authToken, cardData).then((response) => {
        // Validação do status code
        expect(response.status).to.eq(401);

        // Validação dos campos obrigatórios
        expect(response.body.message).not.be.empty
        expect(response.body.message).to.eq("Unauthorized");

      });
    });
  });
});