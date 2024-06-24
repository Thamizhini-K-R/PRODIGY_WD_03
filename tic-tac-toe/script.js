const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        message.textContent = `${currentPlayer} wins!`;
    } else if (board.every(cell => cell)) {
        gameActive = false;
        message.textContent = 'Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `It's ${currentPlayer}'s turn.`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = `It's ${currentPlayer}'s turn.`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

resetGame(); // Initialize the game
