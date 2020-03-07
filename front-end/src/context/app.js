import React, { useContext } from "react";

const AppContext = React.createContext({
  activeGame: {},
  setActiveGame: () => {}
});

export const useAppContext = () => useContext(AppContext);
export default AppContext;
