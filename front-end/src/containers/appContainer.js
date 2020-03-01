import React, { useState, useEffect } from "react";

import AppContext from "../context/app";
import ErrorContext from "../context/error";

import Game from "../services/game";
import Error from "../components/error";
import Header from "../components/header";
import ListItem from "../components/listItem";
import Toolbar from "./toolbar";
import State from "../components/state";
import GameBoard from "./gameBoard";

const AppContainer = () => {
  const [games, setGames] = useState([]);
  const [activeGame, setActiveGame] = useState(0);
  const [error, setError] = useState(undefined);
  const [reset, setReset] = useState(undefined);
  const gameService = new Game();

  useEffect(() => {
    async function fetchAll() {
      try {
        const allGames = await gameService.getAll();
        setGames(allGames);
        if (allGames.length && !activeGame) {
          setActiveGame(allGames[0]);
        }
        setError(undefined);
      } catch (e) {
        setError(e);
      }
    }
    fetchAll();
  }, [reset, setGames, setActiveGame, setError]);

  return (
    <ErrorContext.Provider
      value={{
        error,
        setError
      }}
    >
      <div className="App">
        <AppContext.Provider
          value={{
            games,
            setGames,
            activeGame,
            setActiveGame,
            reset,
            setReset
          }}
        >
          <Header title="Tic Tac Toe Game" />
          <section className="row">
            <div className="col-4">
              <Toolbar />
              {error && <Error message={error} />}
              {games.map(game => (
                <ListItem key={game.id} game={game} />
              ))}
            </div>
            <div className="col-8">
              <b>{activeGame.name}</b>
              <State text={activeGame.state} />
              {
                <span
                  style={{
                    float: "right",
                    fontFamily: "monospace",
                    fontSize: "18px"
                  }}
                >
                  {activeGame.board}
                </span>
              }
              <hr />
              {activeGame ? <GameBoard /> : <h3>Select a Game</h3>}
            </div>
          </section>
        </AppContext.Provider>
      </div>
    </ErrorContext.Provider>
  );
};

export default AppContainer;
