const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');

let currentPlayer = 'X';
let isGameActive = true;
let scoreX = 0;
let scoreO = 0;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  if (cell.classList.contains('taken') || !isGameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    statusText.textContent = `🎉 Congratulations! Player ${currentPlayer} wins!`;
    updateScore(currentPlayer);
    isGameActive = false;
  } else if (isTie()) {
    statusText.textContent = "It's a tie!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => cells[index].textContent === player);
  });
}

function isTie() {
  return [...cells].every(cell => cell.textContent !== '');
}

function updateScore(player) {
  if (player === 'X') {
    scoreX++;
    scoreXEl.textContent = scoreX;
  } else {
    scoreO++;
    scoreOEl.textContent = scoreO;
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'x', 'o');
  });
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
