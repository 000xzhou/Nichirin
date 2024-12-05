import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./NavBar.css";
import ApiService from "../api/api";
import { useCustomerAuth } from "../routes/CustomerAuthProvider";
// import Cart from "./product/Cart";

const Navbar = () => {
  const location = useLocation();
  const { isUser, handleLogout } = useCustomerAuth();

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   try {
  //     // api
  //     const api = new ApiService("http://localhost:3000");

  //     api
  //       .get("/logout")
  //       .then(() => {
  //         setIsUser(false);
  //       })
  //       .catch((err) => console.error(err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <nav>
      <Link to="/">Logo</Link>
      <div className="navIcon">
        {isUser ? (
          <Link to={`/customers/${isUser._id}`}>{isUser.email}</Link>
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
        {/* gets num from local storage (there should be one that just store number) */}
        <Link to="/customers/cart" className="material-symbols-outlined">
          <span>#</span>shopping_cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
