/**
 * Tic Tac Toe Game Functionality:
 * 
 * 1. Generate the spaces
 * 2. When you click on a space a token appears
 * 3. It checks if the player has won
 * 4. It changes token depending on who's turn it is and shows who's turn it is
 * 5. Shows the winning container if a person has won
 * 6. When you click the play again button it clears the board and restarts for a new game
 * 
 */

const tokens = [
    {
        name: "Beemo",
        img: "beemo-token.png",
    },
    {
        name: "Princess Bubblegum",
        img: "bubble-token.png",
    }
]

let player1 = {
  token: 0
}

let player2 = {
  token: 1
}

let gameboard = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]; // array representation of gameboard
let currentPlayer = 1; // indicates who's turn it is
let numTurn = 0; // counts the num of turns made


// Populates the spaces for the gameboard
function populateSpace() {

}

// Implements functionality when a player turn is made
function playerTurn(event) {

}

// Updates the gameboard variable to indicate a token was placed at a specific row, col
function placeToken(row, col) {

}

// Update who's turn it is
function updateTurn() {

}

// Updates the gameboard generating the tokens based on the gameboard values
function updateGameboard() {

}

// Creates and returns the token DOM element of the given player
function makeToken(player) {

}

// Updates win-container reporting a tie
function reportTie() {

}

// Updates win-container reporting a win
function reportWinner() {

}

// Restarts and shows the gameboard to play again
function playAgain() {

}

// Clears the gameboard
function clearGameboard() {

}

// Returns true/false if the current player who just made a move won
function checkWon() {
    // Horizontal
    for (let row = 0; row < 3; row++) {
        let count = 0;
        for (let col = 0; col < 3; col++) {
            if (gameboard[row][col] == currentPlayer) {
                count++;
            }
        }
        if (count == 3) {
            return true;
        }
        count = 0;
    }

    // Vertical
    for (let col = 0; col < 3; col++) {
        let count = 0;
        for (let row = 0; row < 3; row++) {
            if (gameboard[row][col] == currentPlayer) {
                count++;
            }
        }
        if (count == 3) {
            return true;
        }
        count = 0;
    }

    // Diagonal
    if (gameboard[0][0] == currentPlayer && 
        gameboard[1][1] == currentPlayer &&
        gameboard[2][2] == currentPlayer) {
            return true;
    }

    if (gameboard[0][2] == currentPlayer && 
        gameboard[1][1] == currentPlayer &&
        gameboard[2][0] == currentPlayer) {
            return true;
    }

    return false
}