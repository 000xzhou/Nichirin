import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
// import useCart from "./hooks/useCart";
import { useCustomerAuth } from "../routes/CustomerAuthProvider";
import { useCart } from "../routes/CartProvider";

const Navbar = () => {
  const location = useLocation();
  const { isUser, handleLogout } = useCustomerAuth();
  const { cartNum } = useCart();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <div className="nav-bar-right">
        {isUser ? (
          <Link to={`/customers/${isUser._id}`}>{isUser.first_name}</Link>
        ) : (
          <Link to="/login" state={{ from: location }}>
            Login
          </Link>
        )}
        {isUser && (
          <button className="material-symbols-outlined" onClick={handleLogout}>
            logout
          </button>
        )}
        {/* gets num from local storage (there should be one that just store number) */}
        <Link to="/cart" className="cart-container ">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="navbar-cart-number">{cartNum}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
