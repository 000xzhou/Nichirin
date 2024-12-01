import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Create the authentication context
const EmployeeAuthContext = React.createContext();

// Hook to use the context
export const useEmployeeAuth = () => {
  return useContext(EmployeeAuthContext);
};

// Auth provider to manage authentication state
const EmployeeAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state: not checked
  const [isUser, setIsUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/check-auth", {
        credentials: "include", // Ensure cookies are sent
      });
      const data = await response.json();
      if (data.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      if (data.isUser) {
        setIsUser(data.isUser);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication when the component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state while checking auth
  }

  if (!isAuthenticated) {
    return <Navigate to="/employee/login" />;
  }

  return (
    <EmployeeAuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isUser }}
    >
      {children}
    </EmployeeAuthContext.Provider>
  );
};

export default EmployeeAuthProvider;
