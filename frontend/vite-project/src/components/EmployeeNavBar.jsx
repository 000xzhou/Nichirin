import { Link } from "react-router-dom";
// import { useEmployeeAuth } from "../routes/EmployeeAuthContext";
import { useEmployeeAuth } from "../routes/EmployeeAuthProvider";
import ApiService from "../api/api";

const EmployeeNavBar = () => {
  const { setIsAuthenticated } = useEmployeeAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      // api
      const api = new ApiService("http://localhost:3000");

      api
        .get("/logout")
        .then(() => {
          setIsAuthenticated(false);
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      {/* For all employees */}
      <div>
        <Link to={`/employee/dashboard`}>Dashboard</Link>
      </div>
      <div>
        <Link to={`/employee/customers`}>Lookup Customer</Link>
      </div>
      <div>
        <Link to={`/employee/products/create`}>Add Product</Link>
      </div>
      <div>
        <Link to={`/employee/products`}>All Products</Link>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Only for admin */}
      {/* {isEmployeeAuthenticated === "admin" && ( */}
      <>
        <div>
          <Link to={`/employee/create`}>Create Employee</Link>
        </div>
        {/* <div>
          <Link to={`/employee/search`}>Search Employee</Link>
        </div> */}
        <div>
          <Link to={`/employee/all`}>All Employees</Link>
        </div>
      </>
      {/* )} */}
    </nav>
  );
};

export default EmployeeNavBar;
