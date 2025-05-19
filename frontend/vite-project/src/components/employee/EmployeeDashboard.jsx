import { Link } from "react-router-dom";
import { useEmployeeAuth } from "../../routes/EmployeeAuthProvider";
import { useState } from "react";
import "./employeedashboard.css";
import Refund from "./customers/Refund";

const EmployeeDashboard = () => {
  const { isUser } = useEmployeeAuth();

  return (
    <>
      <h1>How can I help?</h1>
      <div className="employee-dashboard">
        <Link to={`/employee/customers`}>
          <div className="secondary-button">Lookup Customer</div>
        </Link>
        <Link to={`/employee/products`}>
          <div className="secondary-button"> All Products</div>
        </Link>
        <Link to={`/employee/products/create`}>
          <div className="secondary-button">Add Product</div>
        </Link>
      </div>
      {isUser.role === "admin" && (
        <div className="admin-dashboard">
          <Link to={`/employee/create`}>
            <div className="main-button">Create Employee</div>
          </Link>
          <Link to={`/employee/all`}>
            <div className="main-button">All Employees</div>
          </Link>
        </div>
      )}
      <Refund />
    </>
  );
};

export default EmployeeDashboard;
