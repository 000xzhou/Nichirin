import { Link } from "react-router-dom";
// import { useEmployeeAuth } from "../EmployeeAuthContext";

const EmployeeDashboard = () => {
  return (
    <>
      <h1>How can I help?</h1>
      <Link to={`/employee/customers`}>Lookup Customer</Link>
      <Link to={`/employee/products`}>All Products</Link>
      <Link to={`/employee/products/create`}>Add Product</Link>
    </>
  );
};

export default EmployeeDashboard;
