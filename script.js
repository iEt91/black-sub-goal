// Configuración inicial
const channelName = 'blackelespanolito';
let currentSubs = 0;
let goalSubs = 100;

// Elemento del DOM
const goalText = document.getElementById('goal-text');

// Función para actualizar el texto
function updateGoalText() {
    console.log(`Actualizando texto: Meta: ${currentSubs}/${goalSubs}`);
    goalText.innerText = `Meta: ${currentSubs}/${goalSubs}`;
}

// Inicializar el conteo de suscriptores desde el servidor
async function initializeSubCount() {
    console.log('Iniciando solicitud para obtener suscriptores...');
    try {
        const response = await fetch(`/subs?channelName=${channelName}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al obtener suscriptores desde el servidor: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        console.log('Server Subs Data:', data);
        if (data.total !== undefined) {
            currentSubs = data.total;
            console.log(`Conteo de suscriptores inicializado: ${currentSubs}`);
        } else {
            throw new Error('El campo "total" no está presente en la respuesta del servidor');
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

// Función que se ejecuta cuando tmi.js se carga
function onTmiLoaded() {
    console.log('tmi.js cargado correctamente');
    if (typeof tmi === 'undefined') {
        console.error('tmi.js no está definido después de cargar');
        return;
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
}

// Inicializar el conteo de suscriptores al cargar
initializeSubCount();

// Si tmi.js ya está cargado (por algún motivo), ejecutamos la lógica directamente
if (typeof tmi !== 'undefined') {
    onTmiLoaded();
} else {
    console.log('Esperando a que tmi.js se cargue...');
}