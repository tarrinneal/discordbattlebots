const Discord = require('discord.js');
const {
  gameState,
  initialGameState,
  init,
  addPlayer,
  initPlayers,
  handleAttack,
  resetGame,
} = require('./methods');
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
      sent = resetGame(msg);
    }

    if (gameState.start) {
      if (
        msg.content.startsWith('!bb atk') &&
        gameState[`player${gameState.turn}`].includes(msg.author.id)
      ) {
        sent = handleAttack(msg);
      }
    } else {
      if (msg.content === '!bb init') {
        sent = init(msg);
      } else if (msg.content.includes('!bb <@') && gameState.init) {
        sent = addPlayer(msg);
      } else if (
        gameState.player1.includes(msg.author.id) &&
        msg.content.includes('!bb {')
      ) {
        sent = initPlayers(msg, 'player1');
      } else if (
        gameState.player2.includes(msg.author.id) &&
        msg.content.includes('!bb {')
      ) {
        sent = initPlayers(msg, 'player2');
      }
    }
    if (!sent) {
      msg.channel.send('Invalid command!');
    }
  }
});

client.login(process.env.distok);

module.exports = { initialGameState, gameState };
