const Discord = require('discord.js');
const { init, addPlayer, initPlayers } = require('./methods');
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
    } else if (msg.content === '!bb gameState') {
      msg.channel.send(JSON.stringify(gameState));
      sent = true;
    } else if (msg.content === '!bb reset') {
      gameState = Object.assign(initialGameState, gameState);
      msg.reply('Game state reset!');
    }

    if (gameState.start) {
      //game messages that alters the game state
    } else {
      if (msg.content === '!bb init') {
        sent = init(msg, gameState);
      } else if (msg.content.includes('!bb <@') && gameState.init) {
        sent = addPlayer(msg, gameState);
      } else if (
        gameState.player1.includes(msg.author.id) &&
        msg.content.includes('!bb {')
      ) {
        sent = initPlayers(msg, gameState, 'player1');
      } else if (
        gameState.player2.includes(msg.author.id) &&
        msg.content.includes('!bb {')
      ) {
        sent = initPlayers(msg, gameState, 'player2');
      }
    }
  }
  if (!sent) {
    msg.reply('Invalid command!');
  }
});

client.login(process.env.distok);

const initialGameState = {
  init: false,
  start: false,
  player1: '',
  player2: '',
  player1Stats: undefined,
  player2Stats: undefined,
};

const gameState = Object.assign(initialGameState);
