import React from "react";
import styled from "styled-components";
import { COLORS } from "../config";

const StyledState = styled.span`
  font-size: 12px;
  font-weight: bold;
  background: ${COLORS.PRIMARY};
  color: ${COLORS.FONT_LIGHT};
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 3px;
`;

const getStatus = text => {
  switch (text) {
    case "o_won":
      return "O WON";
    case "x_won":
      return "X WON";
    case "draw":
      return "DRAW";
    default:
      return "RUNNING";
  }
};

const State = ({ text }) => <StyledState>{getStatus(text)}</StyledState>;

export default State;
