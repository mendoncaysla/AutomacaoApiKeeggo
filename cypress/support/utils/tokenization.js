import { CardData } from './CardData';

const tokenizationUrl = 'https://api-homologacao.getnet.com.br/v1/tokens/card';

export const tokenizeCard = (authToken, cardData) => {
  return cy.request({
    method: 'POST',
    url: tokenizationUrl,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: cardData,
  
  });
};


export const tokenizeCardInvalid = (authToken, cardData) => {
  return cy.request({
    method: 'POST',
    url: tokenizationUrl,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: cardData,
    failOnStatusCode: false, 
  });
};

export const tokenizeCardWhitoutToken = ( cardData) => {
    return cy.request({
      method: 'POST',
      url: tokenizationUrl,
      headers: {
        Authorization: ``,
        'Content-Type': 'application/json'
      },
      body: cardData,
      failOnStatusCode: false,  
    });
  };
  
  
export const tokenizeCardInvalidToken = ( cardData) => {
    return cy.request({
      method: 'POST',
      url: tokenizationUrl,
      headers: {
        Authorization: `438204832048023`,
        'Content-Type': 'application/json'
      },
      body: cardData,
      failOnStatusCode: false,  
    });
  };
