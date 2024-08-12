import { Link } from "react-router-dom";
const EmployeeNavBar = ({ user }) => (
  <nav>
    {/* for all  */}
    <div>
      <Link to={`/employee/login`}>Login</Link>
    </div>
    <div>
      <Link to={`/employee/logout`}>Logout</Link>
    </div>
    <div>
      <Link to={`/customers`}>Lookup Customer</Link>
    </div>
    <div>
      <Link to={`/product/create`}>Add Product</Link>
    </div>
    <div>
      <Link to={`/products`}>All Product</Link>
    </div>

    {user.role === "admin" ? (
      <>
        <div>
          <Link to={`/employee/create`}>Create Employee</Link>
        </div>
        <div>
          <Link to={`/employee/search`}>Search Employee</Link>
        </div>
        <div>
          <Link to={`/employee`}>All Employee</Link>
        </div>
      </>
    ) : (
      ""
    )}
  </nav>
);

const CustomerNavBar = () => (
  <nav>
    <div>
      <Link to={`/`}>Home</Link>
      <Link to={`/products`}>Product</Link>
      <div>Cart Icon</div>
    </div>
  </nav>
);

const NavBar = ({ userRole, user }) => {
  return (
    <>
      {userRole === "employee" ? (
        <EmployeeNavBar user={user} />
      ) : (
        <CustomerNavBar />
      )}
    </>
  );
};

export default NavBar;
