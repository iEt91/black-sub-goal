const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT_ID = '85b7pc94m2rofqg52m7o8jcvc9ywrq';
const ACCESS_TOKEN = 'cdss4bpfd3e3m8r8d8isknj6fmk4ds';

app.use(express.static('.'));

app.get('/subs', async (req, res) => {
    const channelName = req.query.channelName;
    if (!channelName) return res.status(400).send('Falta el parámetro channelName');

    try {
        const response = await axios.get(`https://api.twitch.tv/helix/users?login=${channelName}`, {
            headers: {
                'Client-ID': CLIENT_ID,
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });

        const userId = response.data.data[0].id;

        const subsResponse = await axios.get(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${userId}`, {
            headers: {
                'Client-ID': CLIENT_ID,
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });

        const total = subsResponse.data.total;
        res.json({ total });
    } catch (error) {
        console.error('Error al obtener subs:', error.response?.data || error.message);
        res.status(500).send('Error al obtener subs');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
