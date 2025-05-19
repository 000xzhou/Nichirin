import useGet from "../../hooks/useGet";
import { useCustomerAuth } from "../../../routes/CustomerAuthProvider";
import usePost from "../../hooks/usePost";
import { useParams } from "react-router-dom";
import Item from "./Item";
import { useState } from "react";

function CustomerRefund() {
  const { isUser, setIsUser } = useCustomerAuth();
  const { orderId } = useParams();

  const {
    apiData: orderApi,
    loading: orderLoading,
    error: orderError,
  } = useGet(`/order/${isUser._id}/find/${orderId}`);

  const initialState = {
    customerId: isUser._id,
    orderId: orderId,
    items: {}, //{ itemId: { qty: 0, reason: "" } }
    amount: 0,
  };

  const {
    formData,
    handleItemChange,
    handleSubmit,
    error: postError,
  } = usePost(initialState, `endpoint`, `return point`);

  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  if (orderLoading) return <div>Loading...</div>;
  if (orderError) return <div>Error: {orderError.message}</div>;
  console.log(formData);
  return (
    <div className="container">
      <h2>Choose items to return</h2>
      <form onSubmit={handleSubmit}>
        {orderApi.items.map((item) => (
          <Item
            key={item.itemId}
            itemId={item.itemId}
            name={item.name}
            price={formatPrice(item.price)}
            image={item.image}
            quantity={item.quantity}
            itemData={formData.items[item.itemId] || {}}
            handleItemChange={handleItemChange}
            error={postError}
          />
        ))}
        <button className="main-button padding-point-5">Continue</button>
      </form>
    </div>
  );
}

export default CustomerRefund;
