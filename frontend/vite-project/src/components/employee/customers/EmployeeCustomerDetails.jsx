import { useParams, Link } from "react-router-dom";
import useGet from "../../hooks/useGet";

// params id = customer id
function EmployeeCustomerDetails() {
  const { id } = useParams();

  const {
    apiData: userApi,
    loading: userLoading,
    error: userError,
  } = useGet(`/customers/${id}`);

  const {
    apiData: refundApi,
    loading: refundLoading,
    error: refundError,
  } = useGet(`/refund/findByCustomer/${id}?limit=3`);

  const {
    apiData: orderApi,
    loading: orderLoading,
    error: orderError,
  } = useGet(`/order/${id}/allorders?limit=3`);

  const handleResetPassword = () => {
    // send api to backend to send email to reset password
  };
  if (userLoading && refundLoading && orderLoading)
    return <div>loading...</div>;

  return (
    <div>
      <section>
        <h3>Info</h3>
        <div>
          <div>
            <span>First Name:</span> {userApi.first_name}
          </div>
          <div>
            <span>Last Name:</span> {userApi.last_name}
          </div>
          <div>
            <span>Email:</span> {userApi.email}
          </div>
          <div>
            <span>Phone:</span> {userApi.phone}
          </div>
          <div>
            <span>Created at: </span>
            {new Date(userApi.created_at).toLocaleString()}
          </div>
          <div>
            <span>Updated at: </span>
            {new Date(userApi.updated_at).toLocaleString()}
          </div>
        </div>
        <div className="cusotmer-search-result-button-group">
          <Link to={`edit`}>
            <div className="main-button padding-point-5">Edit</div>
          </Link>
          <button
            onClick={handleResetPassword}
            className="secondary-button padding-point-5"
          >
            Reset Password
          </button>
        </div>
      </section>
      <section>
        <h3>Recent Orders</h3>
        <div>
          {orderApi ? (
            orderApi.map((order) => (
              <div key={order._id}>
                <div>Order ID: {order._id}</div>
                <div>Session ID: {order.sessionId}</div>
                <div>
                  Date: {new Date(order.created_at).toLocaleDateString()}
                </div>
                <div>Total: {order.totalAmount}</div>
                <div>Status: {order.status}</div>
              </div>
            ))
          ) : (
            <div>No order history</div>
          )}

          <div>Link to full order details page</div>
        </div>
      </section>
      <section>
        <h3>Recent Refunds</h3>
        {refundApi && refundApi.length > 0 ? (
          refundApi.map((refund) => (
            <div key={refund._id}>
              <div>Refund ID: {refund._id}</div>
              <div>Order ID:{refund.orderId._id}</div>
              <div>Status: {refund.status}</div>
              <div>Amount: {refund.amount}</div>
              <div>Note: {refund.note ? refund.note : "No note"}</div>
              <div>
                Processed by: {refund.processedBy?.first_name}
                {refund.processedBy?.last_name}
              </div>
              <div>
                Requested at:
                {new Date(refund.requestedAt).toLocaleDateString()}
              </div>
              <Link to={"/detail"}>More detail</Link>
            </div>
          ))
        ) : (
          <div>No refund found</div>
        )}
      </section>
    </div>
  );
}

export default EmployeeCustomerDetails;
