const rows = document.querySelectorAll('tr');
const tiles = document.querySelectorAll('td');
const playerTitle = document.querySelector('#player-turn');
const tableGame = document.querySelector('.game-table');
const playerOneScore = document.querySelector('#player-one-score');
const playerTwoScore = document.querySelector('#player-two-score');
const winMessage = document.querySelector('#win-card');
const restarBtn = document.querySelector('.btn');
const winPlayerMessage = document.querySelector('#message-win');

let playerOne = 1;
let playerTwo = 0;

let countWinPlayerOne = 0;
let countWinPlayerTwo = 0;

const playerTurn = () => {
  if (playerOne === 1) {
    playerOne = 0;
    playerTwo = 1;
    playerTitle.innerText = "Player 1's turn ✅";
    return "playerOne";
  }
  playerOne = 1;
  playerTwo = 0;
  playerTitle.innerText = "Player 2's turn ❌";
  return "playerTwo";
};

let turn = playerTurn();

const checkLine = (trPosition, opOne, opTwo, element) => {
  const d = tableGame.getElementsByTagName("tr")[trPosition];
  let r = d.getElementsByTagName("td")[opOne];
  if (r.innerText === element) {
    r = d.getElementsByTagName("td")[opTwo];
    return (r.innerText === element);
  }
  return false;
};

const checkCol = (tdPosition, opOne, opTwo, element) => {
  let d = tableGame.getElementsByTagName("tr")[opOne];
  let r = d.getElementsByTagName("td")[tdPosition];
  if (r.innerText === element) {
    d = tableGame.getElementsByTagName("tr")[opTwo];
    r = d.getElementsByTagName("td")[tdPosition];
    return (r.innerText === element);
  }
  return false;
};

const checkTrans = (trOpOne, trOpTwo, element, tdOpOne = trOpOne, tdopTwo = trOpTwo) => {
  let d = tableGame.getElementsByTagName("tr")[trOpOne];
  let r = d.getElementsByTagName("td")[tdOpOne];
  if (r.innerText === element) {
    d = tableGame.getElementsByTagName("tr")[trOpTwo];
    r = d.getElementsByTagName("td")[tdopTwo];
    return (r.innerText === element);
  }
  return false;
};

const checkWinOnLines = (tdPosition, trPosition, el) => {
  let win;
  if (tdPosition === 0) {
    win = checkLine(trPosition, 1, 2, el.innerText);
  } else if (tdPosition === 1) {
    return checkLine(trPosition, 0, 2, el.innerText);
  } else if (tdPosition === 2) {
    return checkLine(trPosition, 0, 1, el.innerText);
  }
  return win;
};

const checkWinOnCol = (tdPosition, trPosition, el) => {
  let win;
  if (trPosition === 0) {
    win = checkCol(tdPosition, 1, 2, el.innerText);
  } else if (trPosition === 1) {
    return checkCol(tdPosition, 0, 2, el.innerText);
  } else if (trPosition === 2) {
    return checkCol(tdPosition, 0, 1, el.innerText);
  }
  return win;
};

const checkWinOnTrans = (tdPosition, trPosition, el) => {
  let win;
  if (tdPosition === 0 && trPosition === 0) {
    win = checkTrans(1, 2, el.innerText);
  } else if (tdPosition === 1 && trPosition === 1) {
    return (checkTrans(0, 2, el.innerText) || checkTrans(0, 2, el.innerText, 2, 0));
  } else if (tdPosition === 2 && trPosition === 2) {
    return checkTrans(0, 1, el.innerText);
  } else if (tdPosition === 2 && trPosition === 0) {
    return checkTrans(1, 2, el.innerText, 1, 0);
  } else if (tdPosition === 0 && trPosition === 2) {
    return checkTrans(1, 0, el.innerText, 1, 2);
  }
  return win;
};

const isWin = (el) => {
  const tdPosition = el.cellIndex;
  const trPosition = el.parentNode.rowIndex;
  let win;
  // check lines
  win = checkWinOnLines(tdPosition, trPosition, el);
  if (win) { return true; }
  win = checkWinOnCol(tdPosition, trPosition, el);
  if (win) { return true; }
  win = checkWinOnTrans(tdPosition, trPosition, el);
  if (win) { return true; }
  return false;
};

let turnPlayed = 0;

const addEle = (el) => {
  if (el.innerText === '' && turn === "playerOne") {
    el.innerText = "✅";
    turnPlayed += 1;
    const win = isWin(el);
    if (win) {
      return true;
    }
    turn = playerTurn();
  } else if (el.innerText === '' && turn === "playerTwo") {
    el.innerText = "❌";
    turnPlayed += 1;
    const win = isWin(el);
    if (win) {
      return true;
    }
    turn = playerTurn();
  }
  return false;
};

const restartGame = () => {
  playerOne = 1;
  playerTwo = 0;
  turn = playerTurn();
  tiles.forEach((el) => {
    el.innerText = '';
  });
};

const getPlayer = () => {
  if (turn === 'playerOne') {
    return "Player 1";
  }
  return "Player 2";
};

const addWin = () => {
  if (turn === 'playerOne') {
    countWinPlayerOne += 1;
    playerOneScore.innerText = countWinPlayerOne;
  } else {
    countWinPlayerTwo += 1;
    playerTwoScore.innerText = countWinPlayerTwo;
  }
};


tiles.forEach((el) => {
  el.addEventListener('click', () => {
    if (addEle(el)) {
      winPlayerMessage.innerText = `Congratulations, ${getPlayer()} win! 🎉`;
      winMessage.style.display = 'flex';
      addWin();
    } else if (turnPlayed === 9) {
      winPlayerMessage.innerText = `Congratulations, no one win! 🎉`;
      winMessage.style.display = 'flex';
    }
  });
});

restarBtn.addEventListener('click', () => {
  restartGame();
  winMessage.style.display = 'none';
});
