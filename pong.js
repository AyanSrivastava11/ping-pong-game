let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

// players
let playersWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;

let player1 = {
    x: 10,
    y: boardHeight / 2,
    width: playersWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

let player2 = {
    x: boardWidth - playersWidth - 10,
    y: boardHeight / 2,
    width: playersWidth,
    height: playerHeight,
    velocityY: playerVelocityY
}

let ballWidth = 10;
let ballHeight = 10
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    height: ballHeight,
    width: ballWidth,
    velocityX: 1,
    velocityY: 2
}

let player1Score = 0;
let player2Score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // draw initial player1
    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // player 1
    context.fillStyle = "skyblue";
    // player1.y += player1.velocityY; 

    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // player 2
    // player2.y += player2.velocityY;

    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    // ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if (player1Score >= 5 || player2Score >= 5) {
        // Stop the game
        alert(player1Score >= 5 ? "Player 1 wins! Click OK to start a new game" : "Player 2 wins! Click OK to start a new game");
        NewGame();
    }

    // check collision top and bottom
    if (ball.y <= 0 || (ball.y + ball.height >= boardHeight)) {
        ball.velocityY *= -1;
    }

    // bounce ball back
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            ball.velocityX *= -1;
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) {
            ball.velocityX *= -1;
        }
    }

    // game over
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1);
    }

    // Score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth / 5, 45);
    context.fillText(player2Score, boardWidth * 4 / 5 - 45, 45);

    // dotted line
    for(let i =10; i<board.height; i+=25){
        // i = starting y position, draw a square every 25 px
        // x pos = half of boardWidth -10 , i = y pos, width = 5,height = 5
        context.fillRect(board.width/2 -10 , i,5,5);
    }
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight)
}

function movePlayer(e) {
    // player1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    // player 2
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function resetGame(direction){

    ball.velocityX *= 1.1;
    ball.velocityY *= 1.1;

    ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        height: ballHeight,
        width: ballWidth,
        velocityX: direction * Math.abs(ball.velocityX),
        velocityY: ball.velocityY
    }
}

function NewGame(){
     // Reset player scores
     player1Score = 0;
     player2Score = 0;
 
     // Reset ball position
     ball.x = boardWidth / 2;
     ball.y = boardHeight / 2;
 
     // Reset ball velocity
     ball.velocityX = 1;
     ball.velocityY = 2;
 
     // Reset player positions
     player1.y = boardHeight / 2;
     player2.y = boardHeight / 2;
}