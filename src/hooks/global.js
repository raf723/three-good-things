import React, {useState, useMemo, useContext, createContext} from 'react';

const GlobalContext = createContext(null);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  return context;
};

export const GlobalProvider = ({children}) => {
  // ** ** ** ** ** EFFECTS ** ** ** ** **

  // ** ** ** ** ** ACTIONS ** ** ** ** **

  // ** ** ** ** ** MEMOIZE ** ** ** ** **
  const values = useMemo(() => ({}), []);

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
