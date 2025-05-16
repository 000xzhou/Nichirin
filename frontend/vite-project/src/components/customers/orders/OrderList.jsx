import Order from "./Order";
import useGet from "../../hooks/useGet";
import "./customerorders.css";
import { useCustomerAuth } from "../../../routes/CustomerAuthProvider";

function OrderList() {
  const { isUser, setIsUser } = useCustomerAuth();
  const { apiData, loading, error } = useGet(`/order/${isUser._id}/allorders`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      {apiData && apiData.length > 0 ? (
        apiData.map((order) => (
          <Order
            key={order._id}
            id={order._id}
            sessionId={order.sessionId}
            customerId={order.customerId}
            shipping={order.shipping}
            items={order.items}
            status={order.status}
            totalAmount={order.totalAmount}
            refund={order.refund}
            createdAt={order.createdAt}
            updatedAt={order.updatedAt}
          />
        ))
      ) : (
        <div>You got no orders</div>
      )}
    </div>
  );
}

export default OrderList;
