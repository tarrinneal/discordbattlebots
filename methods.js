const initialGameState = {
  init: false,
  start: false,
  player1: '',
  player2: '',
  player1Stats: undefined,
  player2Stats: undefined,
  turn: 1,
};

let gameState = Object.assign(initialGameState);

const init = (msg) => {
  gameState.init = true;
  msg.channel.send('Initializing game, tag your champions!');
  return true;
};

const addPlayer = (msg) => {
  if (gameState.player1 === '') {
    gameState.player1 = msg.content.split('!bb ')[1];
    msg.channel.send(`${gameState.player1} !init`);
    return true;
  } else if (gameState.player2 === '') {
    gameState.player2 = msg.content.split('!bb ')[1];
    msg.channel.send(`${gameState.player2} !init`);
    return true;
  }
  return false;
};

const initPlayers = (msg, player) => {
  gameState[`${player}Stats`] = JSON.parse(msg.content.split('!bb ')[1]);
  msg.channel.send(JSON.stringify(gameState[`${player}Stats`]));
  if (gameState.player2 === '') {
    msg.channel.send('Tag player 2');
  } else if (gameState.player1Stats && gameState.player2Stats) {
    msg.channel.send('Game initialized! Get ready to rumble!');
    gameState.start = true;
    requestAttack(msg);
  }
  return true;
};

const requestAttack = (msg) => {
  if (gameState.start) {
    const playerTurn = `player${gameState.turn}`;
    msg.channel.send(`${gameState[playerTurn]} attack`);
    return true;
  }
  return false;
};

const handleAttack = (msg) => {
  const atk = msg.content.split(' ')[2];
  if (atk) {
    if (gameState[`player${gameState.turn}Stats`].atkList[atk]) {
      msg.channel.send(
        `${gameState[`player${gameState.turn}`]} attacked with ${
          gameState[`player${gameState.turn}Stats`].atkList[atk].name
        }!`
      );
      calculateDamage(
        msg,
        gameState[`player${gameState.turn}Stats`],
        gameState[`player${gameState.turn === 1 ? 2 : 1}Stats`],
        gameState[`player${gameState.turn}Stats`].atkList[atk]
      );
      return true;
    } else {
      msg.channel.send(`${atk} is not an attack id!`);
      return true;
    }
  }
  return false;
};

const calculateDamage = (msg, attacker, defender, atk) => {
  debugger;
  const damage = Math.floor((atk.dmg * attacker.atk) / defender.def / 5);
  defender.hp -= damage;
  msg.channel.send(`${defender.name} took ${damage} damage!`);
  if (defender.hp <= 0) {
    msg.channel.send(`${defender.name} is dead!`);
    endGame(msg);
  } else {
    gameState.turn = gameState.turn === 1 ? 2 : 1;
    requestAttack(msg);
  }
};

const endGame = (msg) => {
  msg.channel.send(`Game over! ${gameState[`player${gameState.turn}`]} won!`);
  resetGame(msg);
};

const resetGame = (msg) => {
  gameState = Object.assign(initialGameState, gameState);
  msg.channel.send('Game state reset!');
  return true;
};

module.exports = {
  gameState,
  initialGameState,
  init,
  addPlayer,
  initPlayers,
  requestAttack,
  handleAttack,
  calculateDamage,
  endGame,
  resetGame,
};
