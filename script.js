const channelName = 'blackelespanolito';
let currentSubs = 0;
let goalSubs = 100;
let goalTextLabel = 'Meta';
const goalText = document.getElementById('goal-text');

function updateGoalText() {
    goalText.innerText = `${goalTextLabel}: ${currentSubs} / ${goalSubs}`;
}

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

function onTmiLoaded() {
    const client = new tmi.Client({
        options: { debug: true },
        connection: {
            secure: true,
            reconnect: true
        },
        identity: {
            username: 'tangov91_bot',
            password: 'oauth:fxb7gty1wqm2zwb9u4bzl7fhmptyga'
        },
        channels: ['tangov91']
    });

    client.connect().catch(console.error);

    client.on('subscription', () => {
        currentSubs++;
        updateGoalText();
    });

    client.on('resub', () => {
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

initializeSubCount();
onTmiLoaded();
