import React, { useContext, useState } from "react";
import styled from "styled-components";

import { COLORS } from "../config";
import Game from "../services/game";
import AppContext from "../context/app";
import ErrorContext from "../context/error";

const BoardMark = styled.button`
  font-size: 30px;
  border: 1px solid ${COLORS.BORDER_LIGHT};
  width: 60px;
  height: 60px;
  &[disabled] {
    background: ${COLORS.NEUTRAL};
    cursor: not-allowed;
  }
  &.win {
    background: aqua;
  }
`;

const Turn = styled.div`
  float: right;
  font-size: 25px;
  font-weight: bold;
  color: ${COLORS.PRIMARY};
  font-family: monospace;

  span {
    font-size: 20px;
    text-transform: capitalize;
    background: ${COLORS.PRIMARY};
    padding: 5px 10px;
    border-radius: 3px;
    color: white;
    font-weight: bold;
  }
`;

const GameBoard = () => {
  const gameService = new Game();
  const appContext = useContext(AppContext);
  const errorContext = useContext(ErrorContext);
  const [turn, setTurn] = useState("x");

  const markTurn = async spotId => {
    try {
      const board = appContext.activeGame.board.split("");
      board[spotId] = turn;
      const game = await gameService.update(appContext.activeGame.id, {
        board: board.join("")
      });
      appContext.setActiveGame(game);

      // update game array
      const gameIndex = appContext.games.findIndex(g => g.id === game.id);
      const updateGames = appContext.games;
      updateGames[gameIndex] = game;
      appContext.setGames(updateGames);
      setTurn(turn === "x" ? "o" : "x");
    } catch (e) {
      errorContext.setError(e);
    }
  };

  const checkWinningCombo = spot => {
    return (
      appContext.activeGame.combo &&
      appContext.activeGame.combo.includes(spot.toString())
    );
  };

  const renderBoard = (spot) => <BoardMark
    className={checkWinningCombo(spot) && "win"}
    disabled={appContext.activeGame.state !== "running"}
    onClick={() => markTurn(spot)}
  >
    {marks[spot]}
  </BoardMark>;

  const marks = appContext.activeGame.board.split("");

  return (
    <div>
      {appContext.activeGame.state === "running" && (
        <Turn>
          Turn: <span>{turn}</span>
        </Turn>
      )}

      {renderBoard(0)}
      {renderBoard(1)}
      {renderBoard(2)}
      <br />
      {renderBoard(3)}
      {renderBoard(4)}
      {renderBoard(5)}
      <br />
      {renderBoard(6)}
      {renderBoard(7)}
      {renderBoard(8)}
    </div>
  );
};

export default GameBoard;
