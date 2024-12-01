import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ApiService from "../api/api";

const CustomerAuthContext = React.createContext();

export const useCustomerAuth = () => {
  return useContext(CustomerAuthContext);
};

const CustomerAuthProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/check-auth", {
        credentials: "include", // Ensure cookies are sent
      });
      const data = await response.json();
      if (data.user) {
        setIsUser(data.user);
      }
    } catch (error) {
      setIsUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      // api
      const api = new ApiService("http://localhost:3000");

      api
        .get("/logout")
        .then(() => {
          setIsUser(false);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  };

  // Check authentication when the component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state while checking auth
  }

  // if (!isUser) {
  //   return <Navigate to="/login" replace />;
  // }
  return (
    <CustomerAuthContext.Provider value={{ isUser, setIsUser, handleLogout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

export default CustomerAuthProvider;
