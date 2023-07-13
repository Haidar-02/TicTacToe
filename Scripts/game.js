var X_PlayerInput = document.getElementById("player-x-input");
var Y_PlayerInput = document.getElementById("player-y-input");

let startBTN = document.getElementById("startBTN");
let audio = document.getElementById("audio");
let winSound = document.getElementById("win_sound");
var newRoundSound = document.getElementById("newRoundSound");
var drawAudio = document.getElementById("drawAudio");

var X_Player_Name = document.getElementById("playerXName");
var Y_Player_Name = document.getElementById("playerYName");
var X_Score_output = document.getElementById("scoreX");
var Y_Score_output = document.getElementById("scoreY");

let x_score = 0;
let y_score = 0;
let gameActive = true;

var newGame = document.getElementById("newGame");
var restartNew = document.getElementById("restartNew");
var newRound = document.getElementById("newRound");
var changeSides = document.getElementById("changeSides");
var winner = document.getElementById("result");

var gameContainer = document.getElementById("gameContainer");
var playerNames = document.getElementById("playerNames");
var gameBoardContainer = document.getElementById("gameBoardContainer");
var gameBoard = document.getElementById("game-board");
var resultContainer = document.getElementById("resultContainer");

const O_TEXT = "O";
const X_TEXT = "X";
let boxes = Array.from(document.getElementsByClassName("box"));
startBTN.addEventListener("click", function () {
  if (X_PlayerInput.value === "" || Y_PlayerInput.value === "") {
    return false;
  } else {
    playerNames.style.display = "none";
    gameContainer.style.display = "flex";
    gameBoardContainer.style.display = "flex";
    X_Player_Name.innerHTML = X_PlayerInput.value;
    Y_Player_Name.innerHTML = Y_PlayerInput.value;
    X_Score_output.innerHTML = x_score;
    Y_Score_output.innerHTML = y_score;
    boxes.forEach((box) => box.addEventListener("click", boxClicked));
  }
});

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

function boxClicked(e) {
  if (!gameActive) {
    return;
  }
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      gameActive = false;
      winSound.play();

      let winning_blocks = playerHasWon();
      if (currentPlayer === X_TEXT) {
        x_score += 1;
        X_Score_output.innerHTML = x_score;
        winner.innerHTML = X_PlayerInput.value + " Wins !";
      }
      if (currentPlayer === O_TEXT) {
        y_score += 1;
        Y_Score_output.innerHTML = y_score;
        winner.innerHTML = Y_PlayerInput.value + " Wins !";
      }
      winning_blocks.map((box) => (boxes[box].style.backgroundColor = "Green"));
      resultContainer.style.display = "flex";
      return;
    }

    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    audio.play();
    if (checkForDraw() && playerHasWon !== true) {
      drawAudio.play();
      winner.innerHTML = "Draw";
      resultContainer.style.display = "flex";
    }
  }
}
function checkForDraw() {
  for (const space of spaces) {
    if (space === null) {
      return false;
    }
  }
  return true;
}

function playerHasWon() {
  for (const condition of winCombinations) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

newRound.addEventListener("click", startNewRound);

function startNewRound() {
  newRoundSound.play();
  gameActive = true;
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "rgb(58, 58, 60)";
  });
  currentPlayer = X_TEXT;
  resultContainer.style.display = "none";
}

newGame.addEventListener("click", restartNewGame);
function restartNewGame() {
  startNewRound();
  x_score = 0;
  y_score = 0;
  X_Score_output.innerHTML = 0;
  Y_Score_output.innerHTML = 0;
}
restartNew.addEventListener("click", restartWithNewPlayers);

function restartWithNewPlayers() {
  restartNewGame();
  gameContainer.style.display = "none";
  resultContainer.style.display = "none";
  playerNames.style.display = "flex";
  X_PlayerInput.value = "";
  Y_PlayerInput.value = "";
}

changeSides.addEventListener("click", switchPlay);

function switchPlay() {
  startNewRound();
  let tempScore = 0;
  let tempName = 0;
  tempScore = x_score;
  x_score = y_score;
  y_score = tempScore;
  X_Score_output.innerHTML = x_score;
  Y_Score_output.innerHTML = y_score;

  tempName = X_PlayerInput.value;
  X_PlayerInput.value = Y_PlayerInput.value;
  Y_PlayerInput.value = tempName;
  Y_Player_Name.innerHTML = Y_PlayerInput.value;
  X_Player_Name.innerHTML = X_PlayerInput.value;
}
