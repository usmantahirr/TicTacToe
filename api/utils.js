const STATE = {
  RUNNING: "running",
  X_WON: "x_won",
  O_WON: "o_won",
  DRAW: "draw",
  ERROR: "error",
};

function decideWinner(board = "_________") {
  const regex = new RegExp(/^[xo_]{9}$/);
  if(!regex.test(board)) {
    return [STATE.ERROR, "INVALID_BOARD"];
  }

  const winningCombinations = [
    "012",
    "345",
    "678",
    "036",
    "147",
    "258",
    "048",
    "246"
  ];
  const arrBoard = board.split("");
  let o = false;
  let x = false;
  let winningCombo = "";

  for (let i = 0; !x && !o && i < winningCombinations.length; i++) {
    const element = winningCombinations[i];
    const combo = element.split("");
    x =
      arrBoard[combo[0]] === "x" &&
      arrBoard[combo[1]] === "x" &&
      arrBoard[combo[2]] === "x";
    o =
      arrBoard[combo[0]] === "o" &&
      arrBoard[combo[1]] === "o" &&
      arrBoard[combo[2]] === "o";
    if (x || o) {
      winningCombo = combo;
    }
  }

  if (!board.includes("_") && !x && !o) {
    return [STATE.DRAW, winningCombo];
  }

  if (x) return [STATE.X_WON, winningCombo];
  if (o) return [STATE.O_WON, winningCombo];
  return [STATE.RUNNING, winningCombo];
}

module.exports = {
  decideWinner,
  STATE
};
