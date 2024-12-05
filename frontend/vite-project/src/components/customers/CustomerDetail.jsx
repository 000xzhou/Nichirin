import useGet from "../hooks/useGet";
import { useParams, Link } from "react-router-dom";
import EditAddress from "./EditAddress";
import EditCustomer from "./EditCustomer";

function CustomerDetail() {
  // const { id } = useParams();

  // const [apiData, loading, error] = useGet(`/customers/${id}`);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  // console.log(apiData);
  return (
    <div>
      <h2>Your Account</h2>
      <div>
        <Link to="/customers/order">
          <span className="material-symbols-outlined">package_2</span>
          <div>
            <h3>Your Order</h3>
            <p>Track, return, cancel an order</p>
          </div>
        </Link>
        <Link to="/customers/edit-info">
          <span className="material-symbols-outlined">
            admin_panel_settings
          </span>
          <div>
            <h3>Login & Security</h3>
            <p>Edit login, name, and phone number</p>
          </div>
        </Link>
        <Link to="/customers/edit-address">
          <span className="material-symbols-outlined">home</span>
          <div>
            <h3>Your Address</h3>
            <p>Edit your address</p>
          </div>
        </Link>
        <Link to="/customers/edit-address">
          <span className="material-symbols-outlined">local_shipping</span>
          <div>
            <h3>Your Shipping Address</h3>
            <p>Edit your Shipping address</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CustomerDetail;
