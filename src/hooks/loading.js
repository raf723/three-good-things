import React, {useState, useMemo, useContext, createContext} from 'react';

const LoadingContext = createContext(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  return context;
};

export const LoadingProvider = ({children}) => {
  const [loading, setLoading] = useState(false);

  // ** ** ** ** ** MEMOIZE ** ** ** ** **
  const values = useMemo(() => ({loading, setLoading}), [loading, setLoading]);

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <LoadingContext.Provider value={values}>{children}</LoadingContext.Provider>
  );
};
