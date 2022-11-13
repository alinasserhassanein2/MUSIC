const Discord = require("discord.js");
const client = new Discord.Client();

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
