var express = require("express");
var router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const uuid = require("uuid");
const adapter = new FileSync("db.json");
const db = low(adapter);

const STATE = {
  RUNNING: "running",
  X_WON: "x_won",
  O_WON: "o_won",
  DRAW: "draw"
};

function decideWinner(board = "_________") {
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

router.get("/", (req, res) => {
  const games = db.get("games").sortBy('createdAt').reverse();
  return res.json(games);
});

router.post("/", (req, res) => {
  const updatedGames = db
    .get("games")
    .push({
      id: uuid.v1(),
      name: req.body.name,
      board: "_________",
      state: STATE.RUNNING,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    .write()
    .reverse();
  res.json(updatedGames);
});

router.get("/:id", (req, res) => {
  const game = db
    .get("games")
    .find({ id: req.params.id })
    .value();

  res.json(game);
});

router.put("/:id", (req, res) => {
  const [state, combo] = decideWinner(req.body.board);
  const game = db
    .get("games")
    .find({ id: req.params.id })
    .set("board", req.body.board)
    .set("state", state)
    .set("combo", combo)
    .set("updatedAt", Date.now())
    .write();
  res.json(game);
});

router.delete("/:id", (req, res) => {
  const updatedGames = db
    .get("games")
    .remove({ id: req.params.id })
    .write();

  res.json(updatedGames);
});

module.exports = router;
