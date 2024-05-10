// Notes:
//
// ~ Local data is saved to a file called `locke.json`
// ~ Discord bot token saved to file `.env.local`
// These files are not pushed to github. (for safety)
//

// (link unavailable)

// require discord.js
const { Client, Events, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config({ path: './.env.local' });

// New client with intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences
  ]
});

const { startLoading, stopLoading, log, clear, post } = require('./utilitys.js');
const { AI } = require('./ai.js');
const { message } = require('./messages.js'); // handle message incoming

// Events
client.once(Events.ClientReady, async (readyClient) => {
  var payload = { username: 'Server', message: 'One word. Nothing else.' };
  var generated = await AI(payload);
  client.user.setPresence({
    activities: [{ name: `${generated}` }],
    status: 'dnd'
  });
});

client.on('messageCreate', (_message) => {
  message(client, _message);
});

// Login
(async ()=>{
  clear();
  post();
  startLoading(`A`,'Connecting to discord: ');
  if (process.env.DISCORD_TOKEN) {
    await client.login(process.env.DISCORD_TOKEN);
    stopLoading(`A`,'Connected to discord! 🛰️\n');
  } else {
    stopLoading(`A`,'Discord token: Missing. ☠️');
  }
})();