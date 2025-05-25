// Configuración inicial
const channelName = 'blackelespanolito';
const clientId = 'gp762nuuoqcoxypju8c569th9wz7q5';
const accessToken = '9t92yowa2wp0rdag05du4bi3dv95y9';
let currentSubs = 0;
let goalSubs = 100; // Meta inicial por defecto

// Elemento del DOM
const goalText = document.getElementById('goal-text');

// Función para actualizar el texto
function updateGoalText() {
    goalText.innerText = `Meta: ${currentSubs}/${goalSubs}`;
}

// Inicializar el conteo de suscriptores usando la API de Twitch
async function initializeSubCount() {
    try {
        const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const userData = await userResponse.json();
        const channelId = userData.data[0].id;

        const subsResponse = await fetch(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${channelId}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const subsData = await subsResponse.json();
        currentSubs = subsData.total || 0;
        updateGoalText();
    } catch (error) {
        console.error('Error al obtener suscriptores iniciales:', error);
        goalText.innerText = 'Error al cargar datos';
    }
}

// Conectar el bot al chat de Twitch
const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    channels: [channelName]
});

client.connect();

// Escuchar eventos de suscripción
client.on('subscription', (channel, username, method, message, userstate) => {
    currentSubs++;
    updateGoalText();
});

// Escuchar eventos de resuscripción
client.on('resub', (channel, username, months, message, userstate, method) => {
    currentSubs++;
    updateGoalText();
});

// Escuchar comandos en el chat
client.on('message', (channel, userstate, message, self) => {
    if (self) return; // Ignorar mensajes del bot

    if (message.startsWith('!setmeta')) {
        const parts = message.split(' ');
        if (parts.length === 2 && !isNaN(parts[1])) {
            const newGoal = parseInt(parts[1]);
            if (newGoal > 0) {
                goalSubs = newGoal;
                updateGoalText();
            }
        }
    }
});

// Inicializar el conteo de suscriptores al cargar
initializeSubCount();