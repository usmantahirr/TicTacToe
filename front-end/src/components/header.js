import React from 'react';
import styled from 'styled-components';
import {COLORS} from "../config";

const AppHeader = styled.header`
  background: ${COLORS.PRIMARY};
  color: ${COLORS.FONT_LIGHT};
  font-weight: bold;
  font-size: 25px;
  padding: 10px 20px;
`;

const Header = ({ title, ...props }) => {
  return (
    <AppHeader {...props}>
      {title}
    </AppHeader>
  );
};

export default Header;
