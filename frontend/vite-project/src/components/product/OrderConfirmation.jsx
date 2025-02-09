import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../routes/CartProvider";
import useGet from "../hooks/useGet";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

function OrderConfirmation() {
  const navigate = useNavigate();
  const { isUser } = useCustomerAuth();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { handleClearCart } = useCart();

  const [orderData, loading, error] = useGet(
    `/order/${isUser._id}/find/${sessionId}`
  );

  // const [confirmationData] = useGet(
  //   `/order/order-confirmation/${isUser._id}/find/${sessionId}`
  // );

  // clear cart on load if successful
  useEffect(() => {
    if (sessionId) {
      handleClearCart();
    }
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h2>Thank you for your order!</h2>
      <p>Order ID: {orderData._id}</p>
      <h3>Items Purchased: </h3>
      <ul>
        {orderData.items.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>
        <b>Total:</b> ${orderData.totalAmount}
      </p>
      <p>
        A confirmation email has been sent to <b>{isUser.email}</b>.
      </p>
      <button onClick={() => navigate("/")}>Return Home</button>
    </div>
  );
}

export default OrderConfirmation;
