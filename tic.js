document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const turnInfo = document.getElementById('turn-info');
    const gameResult = document.getElementById('game-result');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let moves = 0;
    let gameEnded = false;

    // Event listener for cell clicks
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.textContent && !gameEnded) {
                cell.textContent = currentPlayer;
                moves++;
                checkGameResult();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                turnInfo.textContent = `Player ${currentPlayer}'s turn`;
            }
        });
    });

    // Function to check if there is a winner or tie
    const checkGameResult = () => {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                gameResult.textContent = `Player ${currentPlayer} wins!`;
                gameEnded = true;
                return;
            }
        }

        if (moves === 9) {
            gameResult.textContent = `It's a tie!`;
            gameEnded = true;
        }
    };

    // Event listener for reset button
    resetButton.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        moves = 0;
        gameEnded = false;
        gameResult.textContent = '';
        turnInfo.textContent = `Player ${currentPlayer}'s turn`;
    });
});
