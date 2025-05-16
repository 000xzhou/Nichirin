import { useCart } from "../../routes/CartProvider";
import ApiService from "../../api/api";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import useGet from "../hooks/useGet";

function ConfirmShipping() {
  const { isUser } = useCustomerAuth();
  const navigate = useNavigate();

  const { cart } = useCart();
  const {
    apiData: addresses,
    loading: addressLoading,
    error,
  } = useGet(`/addresses/${isUser._id}`);
  const {
    apiData: defaultAddress,
    loading: defaultAdressLoading,
    error: defaultAddressError,
  } = useGet(`/default/${isUser._id}`);
  const [selectAddress, setSelectAddress] = useState(defaultAddress);
  const [changeAddress, setChangeAddress] = useState(false);

  if (addressLoading) return <div>Loading...</div>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!isUser) {
      navigate("/login");
    } else {
      const api = new ApiService("http://localhost:3000");

      const res = await api.post(`/order/create`, {
        cart, // items in cart
        customerID: isUser._id,
        shipping: "shipping address",
        totalAmount: total,
      });
      // Send to stripe checkout
      window.location.replace(res.url);
    }
  };

  const getAddressList = () => {
    setChangeAddress((prev) => !prev);
  };
  const changleDeliverChange = () => {
    setSelectAddress();
  };

  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <div className="container">
      {changeAddress ? (
        <section>
          <h2>Select a delivery address</h2>
          <div>Address List</div>
          <button onClick={changleDeliverChange}>
            Deliver to this address
          </button>
        </section>
      ) : (
        <section>
          <button onClick={getAddressList}>Change</button>
          <h2>Delivering to </h2>
          <div>Address</div>
        </section>
      )}

      <section>
        {cart.map((item) => (
          <div className="cart-list-img-container" key={item.id}>
            <img
              src={item.image}
              alt={`Image of ${item.name}`}
              className="cart-list-img"
            />
            <div className="cart-list-name">{item.name}</div>
            <div className="cart-list-price">{formatPrice(item.price)}</div>
          </div>
        ))}
      </section>

      <section className="checkoutSession">
        <div className="checkoutSessionSubtotal">
          Order Total: {formatPrice(total)}
        </div>
        <button
          className="main-button padding-point-5"
          onClick={handleCheckout}
        >
          Place your order
        </button>
      </section>
    </div>
  );
}

export default ConfirmShipping;
