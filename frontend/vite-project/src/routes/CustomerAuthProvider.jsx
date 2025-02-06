import React, { useContext, useState, useEffect } from "react";
import ApiService from "../api/api";
import { useNavigate } from "react-router-dom";

const CustomerAuthContext = React.createContext();

export const useCustomerAuth = () => {
  return useContext(CustomerAuthContext);
};

const CustomerAuthProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(null);
  // const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Function to check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/customers/user-auth",
        {
          credentials: "include", // Ensure cookies are sent
        }
      );
      const data = await response.json();
      if (data.user) {
        // setIsAuth(data.isAuthenticated);
        setIsUser(data.user);
      }
    } catch (error) {
      // setIsAuth(false);
      setIsUser(null);
    } finally {
      setLoading(false);
    }
  };

  // const handleLogin = (formData) => {
  //   // console.log(formData);
  //   try {
  //     // api
  //     const api = new ApiService("http://localhost:3000/customers/login");

  //     api
  //       .post(api, formData)
  //       .then((data) => {
  //         // setApiData(data);
  //         setIsUser(data.customers);
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      // api
      const api = new ApiService("http://localhost:3000");

      api
        .get("/logout")
        .then(() => {
          setIsUser(null);
          navigate("/");
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
