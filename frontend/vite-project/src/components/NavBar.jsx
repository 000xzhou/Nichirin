import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavBar.css";
import ApiService from "../api/api";
// import { useCustomerAuth } from "../routes/CustomerAuthProvider";

const Navbar = ({ isUser, setIsUser }) => {
  const location = useLocation();
  // const { isUser, setIsUser } = useCustomerAuth();
  // const [loading, setLoading] = useState(null);

  // const [isUser, setIsUser] = useState(null);

  // useEffect(() => {
  //   console.log("inside");
  //   const checkAuth = async () => {
  //     const response = await fetch("http://localhost:3000/check-auth", {
  //       credentials: "include", // Ensure cookies are sent
  //     });
  //     const data = await response.json();
  //     console.log("isuer data", data);
  //     setIsUser(data.user || null);
  //   };

  //   checkAuth();
  // }, [isUser, setIsUser]);

  // const checkAuth = async () => {
  //   console.log("checking auth");
  //   try {
  //     const response = await fetch("http://localhost:3000/check-auth", {
  //       credentials: "include", // Ensure cookies are sent
  //     });
  //     const data = await response.json();
  //     if (data.user) {
  //       setIsUser(data.user);
  //     }
  //   } catch (error) {
  //     setIsUser(null);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };
  // console.log("Current isUser state Navbar:", isUser);

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
  // console.log("isUser", isUser);
  return (
    <nav>
      <Link to="/">Logo</Link>
      <div className="navIcon">
        {/* <div onClick={checkAuth}> */}
        {/* <Link to="/cart">Cart</Link> */}
        {isUser ? (
          <Link
            to={`/customers/${isUser._id}`}
            className="material-symbols-outlined"
          >
            person
            {isUser._id}
          </Link>
        ) : (
          <Link
            to="/login"
            state={{ from: location }}
            className="material-symbols-outlined"
          >
            person
          </Link>
        )}
        {/* </div> */}

        <button className="material-symbols-outlined" onClick={handleLogout}>
          logout
        </button>
        <Link className="material-symbols-outlined">shopping_cart</Link>
        {/* <Link to="/customers/register" state={{ from: location }}>
          Register
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
