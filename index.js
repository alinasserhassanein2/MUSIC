import { Client, Collection, Intents } from "discord.js";
import { config } from "./utils/config.js";
import { importCommands } from "./utils/importCommands.js";
import { messageCreate } from "./utils/messageCreate.js";

const { TOKEN, PREFIX } = config;

const client = new Client({
  restTimeOffset: 0,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES
  ]
});

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();

/**
 * Client events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "LISTENING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);


client.on("voiceStateUpdate", async (oldVoiceState, newVoiceState) => {
  // if (newVoiceState.channel.id != process.env.ROOM) return;
  if (newVoiceState.channel.type != 'voice') return;
  if (!newVoiceState.member.roles.cache.some(role => role.id === '1000894791623651422')) return;

  const userId = newVoiceState.member.user.id;

  if (newVoiceState.streaming) {
    client.channels.cache.get(process.env.CHANNEL).send(`> ✅ <@${userId}> Started The Live At **${year + "-" + month + "-" + day + " " + hours + ":" + minutes}**`);
  } else if (oldVoiceState.streaming && newVoiceState.streaming == false) {
    client.channels.cache.get(process.env.CHANNEL).send(`> ❌ <@${userId}> Ended The Live At **${year + "-" + month + "-" + day + " " + hours + ":" + minutes}**`);
  }
});


/**
 * Import commands
 */
importCommands(client);

/**
 * Message event
 */
messageCreate(client);


import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
