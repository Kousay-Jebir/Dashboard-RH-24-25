// RoutesContext.js
import React, { createContext, useContext } from 'react';
import routesConfig from '../app-routes';


const RoutesContext = createContext();


export const RoutesProvider = ({ children }) => {
  return (
    <RoutesContext.Provider value={routesConfig}>
      {children}
    </RoutesContext.Provider>
  );
};


export const useRoutes = () => useContext(RoutesContext);
