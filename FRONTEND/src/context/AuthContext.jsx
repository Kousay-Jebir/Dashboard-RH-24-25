// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize authData from cookies if available
  const initialAuthData = {
    accessToken: Cookies.get("accessToken") || null,
  };

  const [authData, setAuthData] = useState(initialAuthData);
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthData.accessToken !== null);

  const logout = () => {
    setIsAuthenticated(false);
    setAuthData({ accessToken: null });
    Cookies.remove("accessToken");
  };

  const login = (accessToken, userRole) => {
    setIsAuthenticated(true)
    setAuthData({ accessToken});
    Cookies.set("accessToken", accessToken, { expires: 1 }); 
  };


  return (
    <AuthContext.Provider
      value={{ authData, login, logout, isAuthenticated}}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };