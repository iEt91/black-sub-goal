// Configuración inicial
const channelName = 'blackelespanolito';
const clientId = 'gp762nuuoqcoxypju8c569th9wz7q5';
const accessToken = '9t92yowa2wp0rdag05du4bi3dv95y9';
let currentSubs = 0;
let goalSubs = 100;

// Elemento del DOM
const goalText = document.getElementById('goal-text');

// Función para actualizar el texto
function updateGoalText() {
    console.log(`Actualizando texto: Meta: ${currentSubs}/${goalSubs}`);
    goalText.innerText = `Meta: ${currentSubs}/${goalSubs}`;
}

// Inicializar el conteo de suscriptores usando la API de Twitch
async function initializeSubCount() {
    console.log('Iniciando solicitud para obtener suscriptores...');
    try {
        // Obtener el ID del canal
        const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, {
            method: 'GET',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        if (!userResponse.ok) {
            const errorText = await userResponse.text();
            throw new Error(`Error al obtener el ID del canal: ${userResponse.status} - ${errorText}`);
        }
        const userData = await userResponse.json();
        console.log('User Data:', userData);
        if (!userData.data || !userData.data[0] || !userData.data[0].id) {
            throw new Error('No se pudo obtener el ID del canal');
        }
        const channelId = userData.data[0].id;
        console.log('Channel ID:', channelId);

        // Obtener el conteo de suscriptores
        const subsResponse = await fetch(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${channelId}`, {
            method: 'GET',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        if (!subsResponse.ok) {
            const errorText = await subsResponse.text();
            throw new Error(`Error al obtener suscriptores: ${subsResponse.status} - ${errorText}`);
        }
        const subsData = await subsResponse.json();
        console.log('Subs Data:', subsData);
        if (subsData.total !== undefined) {
            currentSubs = subsData.total;
            console.log(`Conteo de suscriptores inicializado: ${currentSubs}`);
        } else {
            throw new Error('El campo "total" no está presente en la respuesta de suscriptores');
        }
        updateGoalText();
    } catch (error) {
        console.error('Error al obtener suscriptores iniciales:', error.message);
        goalText.innerText = 'Error al cargar datos';
        // Inicialización manual como respaldo
        console.log('Usando conteo manual como respaldo: 651');
        currentSubs = 651;
        updateGoalText();
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
    console.log(`Nueva suscripción detectada, conteo actual: ${currentSubs}`);
    updateGoalText();
});

// Escuchar eventos de resuscripción
client.on('resub', (channel, username, months, message, userstate, method) => {
    currentSubs++;
    console.log(`Resuscripción detectada, conteo actual: ${currentSubs}`);
    updateGoalText();
});

// Escuchar comandos en el chat
client.on('message', (channel, userstate, message, self) => {
    if (self) return;

    if (message.startsWith('!setmeta')) {
        const parts = message.split(' ');
        if (parts.length === 2 && !isNaN(parts[1])) {
            const newGoal = parseInt(parts[1]);
            if (newGoal > 0) {
                goalSubs = newGoal;
                console.log(`Nueva meta establecida: ${goalSubs}`);
                updateGoalText();
            }
        }
    }
});

// Inicializar el conteo de suscriptores al cargar
initializeSubCount();