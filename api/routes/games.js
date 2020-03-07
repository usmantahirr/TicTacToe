var express = require("express");
var router = express.Router();
const uuid = require("uuid");

const db = require('../db');
const { STATE, decideWinner } = require("../utils");

router.get("/", (req, res) => {
  const games = db
    .get("games")
    .sortBy("createdAt")
    .reverse();
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
