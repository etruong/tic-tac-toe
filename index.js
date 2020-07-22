const tokens = [
    {
        name: "Beemo",
        img: "beemo-token.png",
    },
    {
        name: "Princess Bubblegum",
        img: "bubble-token.png",
    },
    {
        name: "Finn the Human",
        img: "finn-token.png",
    },
    {
        name: "Jake the Dog",
        img: "jake-token.png",
    },
    {
        name: "Lumpy Space Princess",
        img: "lump-token.png",
    },
    {
        name: "Marceline the Vampire",
        img: "vamp-token.png",
    },
    {
        name: "Fire Princess",
        img: "fire-token.png",
    },
    {
        name: "Ice King",
        img: "ice-token.png",
    }
]

const player1 = {
    token: 0
};

const player2 = {
    token: 1
};

let currentTurn = (Math.random() * 2) + 1;
let gameboard = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
let numTurn = 0;

welcomeSetUp();
let yesBtn = document.getElementById("again-btn");
yesBtn.addEventListener("click", playAgain);

function playAgain() {
    gameboard = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    let winContainer = document.getElementById("win-container");
    winContainer.classList.add("hide");
    startGame();
}

function populateSpace() {
    for (let row = 0; row < 3; row++) {
        let parent = document.querySelectorAll('.row');
        console.log(parent)
        for (let col = 0; col < 3; col++) {
            let space = document.createElement('div');
            space.id = row + "-" + col;
            space.classList.add('space');
            space.innerHTML = '&nbsp';
            space.addEventListener('click', playerTurn);
            parent[row].appendChild(space);
        }
    }
}

function playerTurn(event) {
    placeToken(event);
    updateGameboard();
    let won = checkWon();
    if (won) {
        setTimeout(reportWinner, 1000);
        return
    } 
    numTurn++;
    if (numTurn == 9) { // tie
        setTimeout(reportTie, 1000);
    }
    updateTurn();
}

function reportTie() {
    let gameContainer = document.getElementById("gameboard");
    gameContainer.classList.add("hide");
    let winContainer = document.getElementById("win-container");
    winContainer.classList.remove("hide");
    
    document.querySelector("#win-container h2").textContent = "It's a tie";
}

function reportWinner() {
    let gameContainer = document.getElementById("gameboard");
    gameContainer.classList.add("hide");
    let winContainer = document.getElementById("win-container");
    winContainer.classList.remove("hide");
    
    document.querySelector("#win-container h2").textContent = "Congratulations Player " + currentTurn + " Won!";
}

function checkWon() {
    // Horizontal
    for (let row = 0; row < 3; row++) {
        let count = 0;
        for (let col = 0; col < 3; col++) {
            if (gameboard[row][col] == currentTurn) {
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
            if (gameboard[row][col] == currentTurn) {
                count++;
            }
        }
        if (count == 3) {
            return true;
        }
        count = 0;
    }

    // Diagonal
    if (gameboard[0][0] == currentTurn && 
        gameboard[1][1] == currentTurn &&
        gameboard[2][2] == currentTurn) {
            return true;
    }

    if (gameboard[0][2] == currentTurn && 
        gameboard[1][1] == currentTurn &&
        gameboard[2][0] == currentTurn) {
            return true;
    }

    return false
}

function updateTurn() {
    if (currentTurn == 1) {
        currentTurn = 2;
        document.querySelector("#gameboard span").textContent = "Player 1"
    } else {
        currentTurn = 1;
        document.querySelector("#gameboard span").textContent = "Player 2"
    } 
}

function placeToken(event) {
    if (!event.target.id) {
        return
    }
    let space = event.target.id.split("-");
    let row = parseInt(space[0]);
    let col = parseInt(space[1]);
    if (row != NaN && col != NaN && gameboard[row][col] == -1) {
        if (currentTurn == 1) {
            gameboard[row][col] = 1;
        } else { // currentTurn == 2
            gameboard[row][col] = 2;
        }
    }
}

function updateGameboard() {
    for (let row = 0; row < gameboard.length; row++) {
        updateRow(row);
    }
}

function updateRow(row) {
    for (let col = 0; col < gameboard[row].length; col++) {
        let token;
        const space = document.getElementById(row + "-" + col);
        space.innerHTML = "";
        if (gameboard[row][col] == 1) {
            token = makeToken(player1);
            space.appendChild(token);
        } else if (gameboard[row][col] == 2) {
            token = makeToken(player2);
            space.appendChild(token);
        }
    }
}

function makeToken(player) {
    let token = document.createElement('img');
    token.src = "img/tokens/" + tokens[player.token].img;
    token.alt = "player token";
    token.classList.add('token');
    return token;
}

function clearGameboard() {
    document.getElementById("row-1").innerHTML = "";
    document.getElementById("row-2").innerHTML = "";
    document.getElementById("row-3").innerHTML = "";
}

function changeToken(event) {
    let player = event.target.id;
    let tokenImg = document.querySelectorAll("#set-up img");
    let tokenName = document.querySelectorAll("#set-up span");
    if (player ==  "token-change1") {
        player1.token++;

        if (player1.token == tokens.length) {
            player1.token = 0;
        } 

        if (player1.token == player2.token) {
            player1.token++;
        }

        tokenImg[0].src = "img/tokens/" + tokens[player1.token].img;
        tokenName[0].textContent = tokens[player1.token].name;
    } else { // player ==  "token-change2"
        player2.token++;

        if (player2.token == tokens.length) {
            player2.token = 0;
        }
        
        if (player1.token == player2.token) {
            player2.token++;
        }

        tokenImg[1].src = "img/tokens/" + tokens[player2.token].img;
        tokenName[1].textContent = tokens[player2.token].name;
    }
}

function startGame() {
    document.getElementById("set-up").classList.add("hide");
    document.getElementById("gameboard").classList.remove("hide");
    clearGameboard();
    populateSpace();
    numTurn = 0;
}

function welcomeSetUp() {
    setUpToken();

    let changeButton = document.querySelectorAll('#set-up button');
    for (let i = 0; i < changeButton.length - 1; i++) {
        changeButton[i].addEventListener("click", changeToken);
    }

    let startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", startGame);
}

function setUpToken() {
    let tokenImg = document.querySelectorAll("#set-up img");
    let tokenName = document.querySelectorAll("#set-up span");

    tokenImg[0].src = "img/tokens/" + tokens[player1.token].img;
    tokenName[0].textContent = tokens[player1.token].name;

    tokenImg[1].src = "img/tokens/" + tokens[player2.token].img;
    tokenName[1].textContent = tokens[player2.token].name;
}