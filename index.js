const POS = {
  TOP_LEFT: 0,
  TOP_CENTER: 1,
  TOP_RIGHT: 2,
  CENTER_LEFT: 3,
  CENTER_CENTER: 4,
  CENTER_RIGHT: 5,
  BOTTOM_LEFT: 6,
  BOTTOM_CENTER: 7,
  BOTTOM_RIGHT: 8,
};

const WINNING_COMBINATIONS = [
  // Straight Horizontal
  [POS.TOP_LEFT, POS.TOP_CENTER, POS.TOP_RIGHT],
  [POS.CENTER_LEFT, POS.CENTER_CENTER, POS.CENTER_RIGHT],
  [POS.BOTTOM_LEFT, POS.BOTTOM_CENTER, POS.BOTTOM_RIGHT],

  // Straight Vertical
  [POS.TOP_LEFT, POS.CENTER_LEFT, POS.BOTTOM_LEFT],
  [POS.TOP_CENTER, POS.CENTER_CENTER, POS.BOTTOM_CENTER],
  [POS.TOP_RIGHT, POS.CENTER_RIGHT, POS.BOTTOM_RIGHT],

  // Diagonals
  [POS.TOP_LEFT, POS.CENTER_CENTER, POS.BOTTOM_RIGHT],
  [POS.TOP_RIGHT, POS.CENTER_CENTER, POS.BOTTOM_LEFT],
];

const grids = document.querySelectorAll(".cell");
const gridState = new Array(9);
let turnLeft = 9;
let isPlayerTurn = true;

const isWin = (player) => {
  return WINNING_COMBINATIONS.some((combination) =>
    combination.every((winIndex) => gridState[winIndex] == player)
  );
};

const isDraw = () => {
  return turnLeft == 0;
};

grids.forEach((grid) => {
  grid.addEventListener(
    "click",
    (event) => {
      turnLeft--;
      // Tentukan posisi cell terclick
      const clickedCellIndex = event.target.getAttribute("cell");
      // Tentukan siapa player sekarang...
      const currentPlayer = isPlayerTurn ? "X" : "O";
      // Update game state.
      gridState[clickedCellIndex] = currentPlayer;
      event.target.textContent = currentPlayer;
      event.target.classList.add(currentPlayer);
      if (isWin("X")) {
        document.querySelector(".title").textContent = "X menang!";
      }
      if (isWin("O")) {
        document.querySelector(".title").textContent = "O menang!";
      }
      if (isDraw() && !isWin("O") && !isWin("X")) {
        document.querySelector(".title").textContent = "Berakhir dengan draw.";
      }

      // Switch players
      isPlayerTurn = !isPlayerTurn;
    },
    { once: true }
  );
});
