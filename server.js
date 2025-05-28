<<<<<<< HEAD
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('.'));

app.get('/subs', async (req, res) => {
    const channelName = req.query.channelName || 'blackelespanolito';
    const clientId = '85b7pc94m2rofqg52m7o8jcvc9ywrq';
    const accessToken = 'fxb7gty1wqm2zwb9u4bzl7fhmptyga';

    try {
        console.log(`Obteniendo ID del canal para ${channelName}...`);
        const userResponse = await axios.get(`https://api.twitch.tv/helix/users?login=${channelName}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        console.log('User Data:', userResponse.data);
        const channelId = userResponse.data.data[0].id;

        console.log(`Obteniendo suscriptores para channelId ${channelId}...`);
        const subsResponse = await axios.get(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${channelId}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        console.log('Subs Data:', subsResponse.data);
        const totalSubs = subsResponse.data.total || 0;
        res.json({ total: totalSubs });
    } catch (error) {
        console.error('Error al obtener suscriptores:', error.message);
        res.status(500).json({ error: 'Error al obtener suscriptores', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
=======
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('.'));

app.get('/subs', async (req, res) => {
    const channelName = req.query.channelName || 'blackelespanolito';
    const clientId = '85b7pc94m2rofqg52m7o8jcvc9ywrq';
    const accessToken = 'fxb7gty1wqm2zwb9u4bzl7fhmptyga';

    try {
        console.log(`Obteniendo ID del canal para ${channelName}...`);
        const userResponse = await axios.get(`https://api.twitch.tv/helix/users?login=${channelName}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        console.log('User Data:', userResponse.data);
        const channelId = userResponse.data.data[0].id;

        console.log(`Obteniendo suscriptores para channelId ${channelId}...`);
        const subsResponse = await axios.get(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${channelId}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        console.log('Subs Data:', subsResponse.data);
        const totalSubs = subsResponse.data.total || 0;
        res.json({ total: totalSubs });
    } catch (error) {
        console.error('Error al obtener suscriptores:', error.message);
        res.status(500).json({ error: 'Error al obtener suscriptores', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
>>>>>>> 4e4f73bda34b50a766173f5f6f5e160208660e89
});