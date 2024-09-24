import { AuthToken } from './AuthToken';

const clientID = '67823c6d-58de-494f-96d9-86a4c22682cb';
const clientSecret = 'c2d6a06f-5f31-448b-9079-7e170e8536e4';
const authUrl = 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token';

export const getAuthToken = () => {
  return cy.request({
    method: 'POST',
    url: authUrl,
    form: true,
    body: {
      grant_type: 'client_credentials',
      client_id: clientID,
      client_secret: clientSecret
    }
  }).then((response) => {
    return new AuthToken(response.body.access_token);
  });
};
