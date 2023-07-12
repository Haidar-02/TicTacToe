const X_PlayerInput = document.getElementById("player-x-input");
const Y_PlayerInput = document.getElementById("player-y-input");

const startBTN = document.getElementById("startBTN");
startBTN.addEventListener("click", startGame);

const X_Player_Name = document.getElementById("playerXName");
const Y_Player_Name = document.getElementById("playerYName");
const X_Score_output = document.getElementById("scoreX");
const Y_Score_output = document.getElementById("scoreY");

let x_score = 0;
let y_score = 0;

const newGame = document.getElementById("newGame");
newGame.addEventListener("click", startNewGame);
const restartNew = document.getElementById("restartNew");
restartNew.addEventListener("click", restartWithDifferent);
const winner = document.getElementById("result");
const newRound = document.getElementById("newRound");
newRound.addEventListener("click", startNewRound);

const O_TEXT = "O";
const X_TEXT = "X";
let boxes = Array.from(document.getElementsByClassName("box"));

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

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      winner.innerHTML = currentPlayer;
      if (currentPlayer === X_TEXT) {
        x_score += 1;
      } else {
        y_score += 1;
      }
      X_Score_output.innerHTML = x_score;
      Y_Score_output.innerHTML = y_score;
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
}

//TODO startGame(), playerHasWon()
//TODO restartWithDifferent(), startNewGame(), startNewRound()
