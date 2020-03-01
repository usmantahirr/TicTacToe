import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Plus, ArrowRight, X } from "react-feather";

import { COLORS } from "../config";
import IconButton from "../components/icon";
import ErrorContext from "../context/error";
import AppContext from "../context/app";
import Game from "../services/game";

const StyledToolbar = styled.div`
  background: ${COLORS.NEUTRAL};
  padding: 12px;
  border-radius: 3px;
  font-weight: bold;

  .form {
    margin-top: 10px;
    label {
      font-weight: normal;
      font-size: 15px;
      margin-right: 5px;
    }
    input {
      padding: 5px;
      border: 1px solid ${COLORS.BORDER};
      border-radius: 3px;
      font-size: 14px;
      margin-right: 5px;
      line-height: normal;
      &[disabled] {
        cursor: not-allowed;
      }
    }
    button {
      margin-left: 5px;
    }
  }
`;

const gameService = new Game();

const Toolbar = () => {
  const [name, setName] = useState("");
  const [addVisible, setAddVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const errorContext = useContext(ErrorContext);
  const appContext = useContext(AppContext);

  const addGame = async () => {
    setLoading(true);
    try {
      const updatedGames = await gameService.add({
        name
      });
      appContext.setGames(updatedGames);
      setLoading(false);
      setName('');
      setAddVisible(false);
      errorContext.setError(undefined);
    } catch (e) {
      errorContext.setError(e);
      setLoading(false);
    }
  };

  return (
    <StyledToolbar>
      Games
      <IconButton
        style={{ float: "right" }}
        onClick={() => setAddVisible(true)}
      >
        <Plus size={12} />
      </IconButton>
      <br />
      {addVisible && (
        <div className="form">
          <form onSubmit={() => addGame()}>
            <label htmlFor="name">Board Name</label>
            <input
              disabled={loading}
              id="name"
              name="name"
              placeholder="My Board 1"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <div style={{ float: "right" }}>
              <IconButton type="submit" disabled={loading}>
                <ArrowRight size={15} />
              </IconButton>
              <IconButton
                disabled={loading}
                onClick={() => {
                  setAddVisible(false);
                  setName("");
                }}
              >
                <X size={15} />
              </IconButton>
            </div>
          </form>
        </div>
      )}
    </StyledToolbar>
  );
};

export default Toolbar;
