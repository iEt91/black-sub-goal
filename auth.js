<<<<<<< HEAD
const axios = require('axios');

const CLIENT_ID = '85b7pc94m2rofqg52m7o8jcvc9ywrq';
const CLIENT_SECRET = 'qrx5r9si4fnu7mupo47bwc4laqrdkp'; // Reemplaza con tu Client Secret
const CODE = 'triimbizysb9sljupvrv7csyaig8dq'; // Código de autorización
const REDIRECT_URI = 'http://localhost:3000';

async function getToken() {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: CODE,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      },
    });
    const token = response.data.access_token;
    console.log('Token OAuth:', token);
    console.log('Por favor, copia este token y configúralo en TWITCH_TOKEN en tu archivo .env');
  } catch (error) {
    console.error('Error al obtener el token:', error.response ? error.response.data : error.message);
  }
}

=======
const axios = require('axios');

const CLIENT_ID = '85b7pc94m2rofqg52m7o8jcvc9ywrq';
const CLIENT_SECRET = 'qrx5r9si4fnu7mupo47bwc4laqrdkp'; // Reemplaza con tu Client Secret
const CODE = 'triimbizysb9sljupvrv7csyaig8dq'; // Código de autorización
const REDIRECT_URI = 'http://localhost:3000';

async function getToken() {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: CODE,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      },
    });
    const token = response.data.access_token;
    console.log('Token OAuth:', token);
    console.log('Por favor, copia este token y configúralo en TWITCH_TOKEN en tu archivo .env');
  } catch (error) {
    console.error('Error al obtener el token:', error.response ? error.response.data : error.message);
  }
}

>>>>>>> 4e4f73bda34b50a766173f5f6f5e160208660e89
getToken();