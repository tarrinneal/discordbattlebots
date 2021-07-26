const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  let sent = false;
  if (msg.content.startsWith('!bb')) {
    if (msg.content === '!bb') {
      msg.channel.send(
        'Check out the readme for instructions on how to play at https://github.com/tarrinneal/discordbattlebots'
      );
      sent = true;
    }
    if (msg.content === '!bb init') {
      gameState.init = true;
      msg.reply('Initializing game, tag your champions!');
      sent = true;
    }
    if (msg.content.includes('!bb <@') && gameState.init) {
      if (gameState.player1 === '') {
        gameState.player1 = msg.content.split('!bb ')[1];
        msg.reply(`${gameState.player1} !init`);
        sent = true;
      } else if (gameState.player2 === '') {
        gameState.player2 = msg.content.split('!bb ')[1];
        msg.reply(`${gameState.player2} !init`);
        sent = true;
      }
    }
    if (
      gameState.player1.includes(msg.author.id) &&
      msg.content.includes('!bb {')
    ) {
      gameState.player1Stats = JSON.parse(msg.content.split('!bb ')[1]);
      msg.reply(JSON.stringify(gameState.player1Stats));
      sent = true;
    } else if (
      gameState.player2.includes(msg.author.id) &&
      msg.content.includes('!bb {')
    ) {
      gameState.player2Stats = JSON.parse(msg.content.split('!bb ')[1]);
      msg.reply(JSON.stringify(gameState.player1Stats));
      sent = true;
    }
    if (!sent) {
      msg.reply('Invalid command!');
    }
  }
});

client.login(process.env.distok);

const gameState = {
  init: false,
  player1: '',
  player2: '',
  player1Stats: undefined,
  player2Stats: undefined,
};
