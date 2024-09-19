import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = (email, password) => {
    // Perform login logic here (API call, validation, etc.)
    // For now, we'll just simulate a successful login
    setIsAuthenticated(true);
    navigate('/dashboard'); // Redirect to dashboard after successful login
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
