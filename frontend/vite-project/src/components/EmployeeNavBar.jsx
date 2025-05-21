import { Link } from "react-router-dom";
// import { useEmployeeAuth } from "../routes/EmployeeAuthContext";
import { useEmployeeAuth } from "../routes/EmployeeAuthProvider";
import ApiService from "../api/api";
import "./employeenavbar.css";
import { useState } from "react";

const EmployeeNavBar = () => {
  const { setIsAuthenticated, isUser, setIsUser } = useEmployeeAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      // api
      const api = new ApiService("http://localhost:3000");

      api
        .get("/logout")
        .then(() => {
          setIsAuthenticated(false);
          setIsUser(null);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <nav className="employee-navbar">
      {/* For all employees */}
      <div className="employee-navbar-always-display">
        <div className="flex-gap-0-25">
          <span
            className="employee-small-screen-menu material-symbols-outlined"
            onClick={handleOpenMenu}
          >
            menu
          </span>
          <Link to={`/employee/profile/${isUser._id}`}>
            Welcome {isUser.first_name}!
          </Link>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="main-button padding-point-5 border-radius-button"
          >
            Logout
          </button>
        </div>
      </div>
      <div className={`employee-navbar-list ${openMenu ? "show" : "hide"}`}>
        <Link to={`/employee/dashboard`}>
          <div onClick={handleOpenMenu}>Dashboard</div>
        </Link>
        <Link to={`/employee/customers`}>
          <div onClick={handleOpenMenu}>Lookup Customer</div>
        </Link>
        <Link to={`/employee/search/refund`}>
          <div onClick={handleOpenMenu}>Lookup Refunds</div>
        </Link>
        <Link to={`/employee/products`}>
          <div onClick={handleOpenMenu}>All Products</div>
        </Link>

        {/* Only for admin */}
        {isUser.role === "admin" && (
          <>
            <Link to={`/employee/create`}>
              <div onClick={handleOpenMenu}>Create Employee</div>
            </Link>
            <Link to={`/employee/all`}>
              <div onClick={handleOpenMenu}>All Employees</div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default EmployeeNavBar;
