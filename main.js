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

        announce("Player 1 go first!");
    }
    else
    {
        player2.isInTurn = true;

        announce("Player 2 go first!");
    }
}

function switchPlayer() {
    if (player1.isInTurn)
    {
        player1.isInTurn = false;
        player2.isInTurn = true;

        announce("Player 2 turn!");
    }
    else
    {
        player1.isInTurn = true;
        player2.isInTurn = false;

        announce("Player 1 turn!");
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
        else if (checkTie())
        {
            announceTie();
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

const cellButtons = document.getElementsByClassName("cell-button");

for (let i = 0; i < cellButtons.length; i++)
{
    cellButtons[i].addEventListener("click", (event) => {
        chooseCell(i);
        cellButtons[i].textContent = gameBoard[i];
    });
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

function checkTie()
{
    for (let i = 0; i < 9; i++)
    {
        if (gameBoard[i] === null)
        {
            return false;
        }
    }

    return true;
}

function announceWinner()
{
    const winningPlayer = player1.isInTurn ? player1 : player2;
    winningPlayer.points++;
    console.log("Winner: " + winningPlayer.name);
    console.log(gameBoard);

    stopGame(winningPlayer.name + " wins!");
}

function announceTie()
{
    console.log("Tied!");

    stopGame("Tied!");
}

function stopGame(message)
{
    const gameBoardContainer = document.getElementById("game-board");

    const gameOverScreen = document.createElement("div");
    gameOverScreen.id = "game-over-screen";

    gameBoardContainer.append(gameOverScreen);

    announce(message);
}

function announce(message)
{
    const announcer = document.getElementById("announcer")
    announcer.textContent = message;
}

const newGameButton = document.getElementById("new-game-button");
newGameButton.addEventListener("click", (event) => resetGame());

function resetGame()
{
    for (let i = 0; i < 9; i++)
    {
        gameBoard[i] = null;
        cellButtons[i].textContent = "";
    }

    const gameOverScreen = document.getElementById("game-over-screen");
    gameOverScreen.remove();

    player1.isInTurn = false;
    player2.isInTurn = false;

    chooseStartingPlayer();
    
    console.log("\nSTART GAME!");
    console.log(gameBoard);
    console.log(player1);
    console.log(player2);
}