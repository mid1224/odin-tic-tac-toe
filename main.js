const gameBoard = [null, null, null, null, null, null, null, null, null];

const player1 = {
    name: "Player 1",
    marker: "X",
    isInTurn: false,
    points: 0
};

const player2 = {
    name: "Player 2",
    marker: "O",
    isInTurn: false,
    points: 0
};

function chooseStartingPlayer() {
    const randomNum = Math.random();
    if (randomNum < 0.5)
    {
        player1.isInTurn = true;
    }
    else
    {
        player2.isInTurn = true;
    }
}

function switchPlayer() {
    if (player1.isInTurn)
    {
        player1.isInTurn = false;
        player2.isInTurn = true;
    }
    else
    {
        player1.isInTurn = true;
        player2.isInTurn = false;
    }
}

chooseStartingPlayer();

console.log(gameBoard);
console.log(player1);
console.log(player2);

function chooseCell(a) {
    if (gameBoard[a] === null)
    {
        gameBoard[a] = player1.isInTurn ? player1.marker : player2.marker;

        if (checkWinner())
        {
            announceWinner();
        }
        else
        {
            switchPlayer();

            console.log(player1);
            console.log(player2);
            console.log(gameBoard);
        }
    }
    else
    {
        console.log("The chosen cell was already occupied!");
    }
}

function checkWinner()
{
    const winningCombinations = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true; // We have a winner
        }
    }

    return false; //No winner yet
}

function announceWinner()
{
    const winningPlayer = player1.isInTurn ? player1 : player2;
    winningPlayer.points++;
    console.log("Winner: " + winningPlayer.name);
    console.log(gameBoard);

    resetGame();
}

function resetGame()
{
    for (let i = 0; i < 9; i++)
    {
        gameBoard[i] = null;
    }
    player1.isInTurn = false;
    player2.isInTurn = false;

    chooseStartingPlayer();
    
    console.log("\nSTART GAME!");
    console.log(gameBoard);
    console.log(player1);
    console.log(player2);
}