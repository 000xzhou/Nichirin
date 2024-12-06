import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import useCart from "./hooks/useCart";
import { useCustomerAuth } from "../routes/CustomerAuthProvider";

const Navbar = () => {
  const location = useLocation();
  const { isUser, handleLogout } = useCustomerAuth();
  const [, , , , , , , cartNum] = useCart();

  console.log(cartNum);
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
        <Link to="/cart" className="material-symbols-outlined">
          shopping_cart<span>{cartNum}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
