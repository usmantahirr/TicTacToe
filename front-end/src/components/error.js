import React from 'react';
import styled from 'styled-components';
import { COLORS } from "../config";

const ErrorMessage = styled.div`
  background: ${COLORS.DANGER};
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 3px;
`;

const Error = ({ message }) => (
  <ErrorMessage>
    {message}
  </ErrorMessage>
);

export default Error;
