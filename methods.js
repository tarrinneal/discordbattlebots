const init = (msg, gameState) => {
  gameState.init = true;
  msg.reply('Initializing game, tag your champions!');
  return true;
};

const addPlayer = (msg, gameState) => {
  if (gameState.player1 === '') {
    gameState.player1 = msg.content.split('!bb ')[1];
    msg.reply(`${gameState.player1} !init`);
    return true;
  } else if (gameState.player2 === '') {
    gameState.player2 = msg.content.split('!bb ')[1];
    msg.reply(`${gameState.player2} !init`);
    return true;
  }
  return false;
};

const initPlayers = (msg, gameState, player) => {
  gameState[`${player}Stats`] = JSON.parse(msg.content.split('!bb ')[1]);
  msg.reply(JSON.stringify(gameState[`${player}Stats`]));
  if (gameState.player2 === '') {
    msg.reply('Tag player 2');
  } else if (gameState.player1Stats && gameState.player2Stats) {
    msg.reply('Game initialized! Get ready to rumble!');
    gameState.start = true;
  }
  return true;
};

module.exports = {
  init,
  addPlayer,
  initPlayers,
};
