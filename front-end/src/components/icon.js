import React from "react";
import styled from "styled-components";
import { COLORS } from "../config";

const StyledButton = styled.button`
  padding: 5px 5px 3px 5px;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 3px;
  line-height: normal;
  transition: all 0.2s;

  &:hover {
    background: ${COLORS.HOVER};
    border: 1px solid ${COLORS.BORDER};
    cursor: pointer;
  }

  &.error {
    background: ${COLORS.DANGER};
    color: white;
    border: 1px solid ${COLORS.DANGER};
    font-weight: bold;
  }
  &[disabled] {
    background: lightgrey;
    cursor: not-allowed;
  }
`;

const IconButton = ({ error, onClick, children, ...props }) => (
  <StyledButton className={error && "error"} onClick={onClick} {...props}>
    {children}
  </StyledButton>
);

export default IconButton;
