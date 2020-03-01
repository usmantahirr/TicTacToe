import React from "react";
import styled from "styled-components";
import { ArrowRight } from "react-feather";
import AppContext from "../context/app";
import IconButton from "./icon";
import { COLORS } from "../config";

const StyledItem = styled.div`
  border-bottom: 1px dotted ${COLORS.BORDER_LIGHT};
  padding: 10px;
  &.active {
    background: ${COLORS.BORDER_LIGHT};
  }
`;

const Time = styled.span`
  background: ${COLORS.PRIMARY};
  color: ${COLORS.NEUTRAL};
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 3px;
  margin-left: 10px;
  font-size: 12px;
`;

const ListItem = ({ game, ...props }) => (
  <AppContext.Consumer {...props}>
    {({ activeGame, setActiveGame }) => (
      <StyledItem className={game.id === activeGame.id && "active"}>
        {game.name}
        <Time>{new Date(game.createdAt).toLocaleDateString()}</Time>
        <Time>{new Date(game.createdAt).toLocaleTimeString()}</Time>
        <div style={{ float: "right" }}>
          <IconButton
            style={{ marginRight: "5px" }}
            onClick={() => setActiveGame(game)}
          >
            <ArrowRight size={15} />
          </IconButton>
        </div>
      </StyledItem>
    )}
  </AppContext.Consumer>
);

export default ListItem;
