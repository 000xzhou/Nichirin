import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../routes/CartProvider";
import useGet from "../../hooks/useGet";
import { useCustomerAuth } from "../../../routes/CustomerAuthProvider";
import "./orderconfirmation.css";

function OrderConfirmation() {
  const navigate = useNavigate();
  const { isUser } = useCustomerAuth();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const { handleClearCart } = useCart();

  const {
    apiData: orderData,
    loading,
    error,
  } = useGet(`/order/${isUser._id}/find/${sessionId}`);

  // clear cart on load if successful
  useEffect(() => {
    if (sessionId) {
      handleClearCart();
    }
  }, []);

  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <h2>Thank you for your order!</h2>

      <p>Order ID: {orderData._id}</p>
      <h3>Items Purchased: </h3>
      <ul>
        {orderData.items.map((item) => (
          <li key={item._id} className="order-confirmation-li-wrapper">
            <div className="cart-list-img-container">
              <img src={item.image} alt="image" />
              <div className="qty">{item.quantity}</div>
            </div>
            <div className="order-confirmation-item-info">
              <div>{item.name}</div>
              <div>{formatPrice(item.price)}</div>
            </div>
          </li>
        ))}
      </ul>
      <p>
        <b>Total:</b> {formatPrice(orderData.totalAmount)}
      </p>
      <p>
        A confirmation email has been sent to <b>{isUser.email}</b>.
      </p>
      <button
        className="main-button padding-point-5"
        onClick={() => navigate("/")}
      >
        Return Home
      </button>
    </div>
  );
}

export default OrderConfirmation;
