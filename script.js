<<<<<<< HEAD
// Configuración inicial
const channelName = 'blackelespanolito';
const botToken = 'oauth:fxb7gty1wqm2zwb9u4bzl7fhmptyga';
let currentSubs = 0;
let goalSubs = 100;
let goalTextLabel = 'Meta';

// Elemento del DOM
const goalText = document.getElementById('goal-text');

// Función para actualizar el texto
function updateGoalText() {
    goalText.innerText = `${goalTextLabel}: ${currentSubs} / ${goalSubs}`;
}

// Inicializar el conteo de suscriptores desde el servidor
async function initializeSubCount() {
    try {
        const response = await fetch(`/subs?channelName=${channelName}`);
        if (!response.ok) throw new Error(`Error al obtener subs: ${response.statusText}`);
        const data = await response.json();
        if (data.total !== undefined) {
            currentSubs = data.total;
        } else {
            throw new Error('Respuesta inválida del servidor');
        }
        updateGoalText();
    } catch (error) {
        console.error('Error al cargar subs:', error.message);
        goalText.innerText = 'Error al cargar datos';
    }
}

// Cargar tmi.js localmente si falla el CDN
function loadLocalTmi() {
    const script = document.createElement('script');
    script.src = '/node_modules/tmi.js/dist/tmi.min.js';
    script.onload = onTmiLoaded;
    script.onerror = () => console.error('Error al cargar tmi.js localmente');
    document.head.appendChild(script);
}

// Inicializar tmi.js y conectarse al chat
function onTmiLoaded() {
    if (typeof tmi === 'undefined') {
        console.error('tmi.js no disponible');
        return;
    }

    const client = new tmi.Client({
        options: { debug: true },
        connection: {
            secure: true,
            reconnect: true
        },
        identity: {
            username: 'tangov91_bot',
            password: botToken
        },
        channels: ['tangov91']
    });

    client.connect().catch(console.error);

    client.on('subscription', (channel, username) => {
        currentSubs++;
        updateGoalText();
    });

    client.on('resub', (channel, username) => {
        currentSubs++;
        updateGoalText();
    });

    client.on('message', (channel, userstate, message, self) => {
        if (self) return;

        const isMod = userstate.mod || userstate['display-name'].toLowerCase() === 'tangov91';
        if (!isMod) return;

        if (message.startsWith('!meta ')) {
            const arg = message.slice(6).trim();

            if (!isNaN(arg)) {
                const newGoal = parseInt(arg);
                if (newGoal > 0) {
                    goalSubs = newGoal;
                    console.log(`Nueva meta numérica: ${goalSubs}`);
                }
            } else if (arg.length > 0) {
                goalTextLabel = arg.charAt(0).toUpperCase() + arg.slice(1);
                console.log(`Nuevo texto de meta: ${goalTextLabel}`);
            }

            updateGoalText();
        }
    });
}

// Iniciar carga
initializeSubCount();
if (typeof tmi !== 'undefined') {
    onTmiLoaded();
} else {
    loadLocalTmi();
}
=======
// Configuración inicial
const channelName = 'blackelespanolito';
const botToken = 'oauth:fxb7gty1wqm2zwb9u4bzl7fhmptyga';
let currentSubs = 0;
let goalSubs = 100;
let goalTextLabel = 'Meta';

// Elemento del DOM
const goalText = document.getElementById('goal-text');

// Función para actualizar el texto
function updateGoalText() {
    goalText.innerText = `${goalTextLabel}: ${currentSubs} / ${goalSubs}`;
}

// Inicializar el conteo de suscriptores desde el servidor
async function initializeSubCount() {
    try {
        const response = await fetch(`/subs?channelName=${channelName}`);
        if (!response.ok) throw new Error(`Error al obtener subs: ${response.statusText}`);
        const data = await response.json();
        if (data.total !== undefined) {
            currentSubs = data.total;
        } else {
            throw new Error('Respuesta inválida del servidor');
        }
        updateGoalText();
    } catch (error) {
        console.error('Error al cargar subs:', error.message);
        goalText.innerText = 'Error al cargar datos';
    }
}

// Cargar tmi.js localmente si falla el CDN
function loadLocalTmi() {
    const script = document.createElement('script');
    script.src = '/node_modules/tmi.js/dist/tmi.min.js';
    script.onload = onTmiLoaded;
    script.onerror = () => console.error('Error al cargar tmi.js localmente');
    document.head.appendChild(script);
}

// Inicializar tmi.js y conectarse al chat
function onTmiLoaded() {
    if (typeof tmi === 'undefined') {
        console.error('tmi.js no disponible');
        return;
    }

    const client = new tmi.Client({
        options: { debug: true },
        connection: {
            secure: true,
            reconnect: true
        },
        identity: {
            username: 'tangov91_bot',
            password: botToken
        },
        channels: ['tangov91']
    });

    client.connect().catch(console.error);

    client.on('subscription', (channel, username) => {
        currentSubs++;
        updateGoalText();
    });

    client.on('resub', (channel, username) => {
        currentSubs++;
        updateGoalText();
    });

    client.on('message', (channel, userstate, message, self) => {
        if (self) return;

        const isMod = userstate.mod || userstate['display-name'].toLowerCase() === 'tangov91';
        if (!isMod) return;

        if (message.startsWith('!meta ')) {
            const arg = message.slice(6).trim();

            if (!isNaN(arg)) {
                const newGoal = parseInt(arg);
                if (newGoal > 0) {
                    goalSubs = newGoal;
                    console.log(`Nueva meta numérica: ${goalSubs}`);
                }
            } else if (arg.length > 0) {
                goalTextLabel = arg.charAt(0).toUpperCase() + arg.slice(1);
                console.log(`Nuevo texto de meta: ${goalTextLabel}`);
            }

            updateGoalText();
        }
    });
}

// Iniciar carga
initializeSubCount();
if (typeof tmi !== 'undefined') {
    onTmiLoaded();
} else {
    loadLocalTmi();
}
>>>>>>> 4e4f73bda34b50a766173f5f6f5e160208660e89
