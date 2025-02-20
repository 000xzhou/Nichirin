import { Link } from "react-router-dom";
import { useEmployeeAuth } from "../../routes/EmployeeAuthProvider";
import { useState } from "react";

const EmployeeDashboard = () => {
  const { isUser } = useEmployeeAuth();

  return (
    <>
      <h1>How can I help?</h1>
      <div>
        <div>
          <Link to={`/employee/customers`}>Lookup Customer</Link>
        </div>
        <div>
          <Link to={`/employee/products`}>All Products</Link>
        </div>
        <div>
          <Link to={`/employee/products/create`}>Add Product</Link>
        </div>
      </div>
      {isUser.role === "admin" && (
        <div>
          <div>
            <Link to={`/employee/create`}>Create Employee</Link>
          </div>
          <div>
            <Link to={`/employee/all`}>All Employees</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeDashboard;
