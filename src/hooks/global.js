import React, {useState, useMemo, useContext, createContext} from 'react';

const GlobalContext = createContext(null);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  return context;
};

export const GlobalProvider = ({children}) => {
  const [user, setUser] = useState();

  // ** ** ** ** ** EFFECTS ** ** ** ** **

  // ** ** ** ** ** ACTIONS ** ** ** ** **

  // ** ** ** ** ** MEMOIZE ** ** ** ** **
  const values = useMemo(() => ({user, setUser}), [user, setUser]);

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
