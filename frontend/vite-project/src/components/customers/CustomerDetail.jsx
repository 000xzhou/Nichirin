import { Link } from "react-router-dom";

function CustomerDetail() {
  return (
    <div className="container">
      <h2>Your Account</h2>
      <div>
        <Link to="/customers/orders">
          <span className="material-symbols-outlined">package_2</span>
          <div>
            <h3>Your Order</h3>
            <p>Track, return, cancel an order</p>
          </div>
        </Link>
        <Link to="/customers/login-security">
          <span className="material-symbols-outlined">
            admin_panel_settings
          </span>
          <div>
            <h3>Login & Security</h3>
            <p>Edit login, name, and phone number</p>
          </div>
        </Link>
        <Link to="/customers/addresses">
          <span className="material-symbols-outlined">home</span>
          <div>
            <h3>Your Address</h3>
            <p>Edit your address</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CustomerDetail;
