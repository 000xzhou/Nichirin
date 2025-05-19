import { useParams, Link } from "react-router-dom";
import { useEmployeeAuth } from "../../../routes/EmployeeAuthProvider";
import useGet from "../../hooks/useGet";
import usePatchEmployee from "../../hooks/usePatchEmployee";

// isusses refund by employee
function Refund() {
  const { isUser } = useEmployeeAuth();
  const { orderId } = useParams();

  const initialState = {
    status: "status",
    processedBy: isUser._id,
    note: "",
  };

  const {
    apiData: refundApi,
    loading,
    error,
    refetch,
  } = useGet("/refund/getAll?status=pending");

  const {
    formData,
    handleChange,
    handleStatusChange,
    error: patchError,
  } = usePatchEmployee(initialState);

  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  if (loading) <div>loading...</div>;

  return (
    <div>
      <h2>Pending Refunds</h2>
      {refundApi?.length > 0 ? (
        refundApi.map((refund) => (
          <div key={refund._id}>
            <h3>Order #{refund.orderId._id}</h3>
            <div>
              <p>Customer ID: {refund.customerId._id}</p>
              <p>
                Requested: {new Date(refund.requestedAt).toLocaleDateString()}
              </p>
              <p>Total Refund: {formatPrice(refund.amount)}</p>
            </div>
            <div>
              {refund.items.map((item) => (
                <div key={item.itemId}>
                  <img src={item.productImage} alt="Product image" />
                  <div>
                    <p>Product ID: {item._id}</p>
                    <p>Product: {item.productId.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Reason: {item.reason}</p>
                  </div>
                </div>
              ))}
              <div>
                <p>Note:</p>
                <textarea
                  name="note"
                  id="note"
                  rows={4}
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="e.g. Customer provided clear evidence"
                ></textarea>
              </div>
            </div>
            <button
              type="button"
              className="confirm-button padding-point-5"
              onClick={async (e) => {
                await handleStatusChange(
                  e,
                  `/refund/${refund._id}`,
                  "approved"
                );
                await refetch();
              }}
            >
              Approve
            </button>
            <button
              type="button"
              className="reject-button padding-point-5"
              onClick={async (e) => {
                await handleStatusChange(
                  e,
                  `/refund/${refund._id}`,
                  "rejected"
                );
                await refetch();
              }}
            >
              Reject
            </button>
          </div>
        ))
      ) : (
        <div>No pending refunds</div>
      )}
    </div>
  );
}

export default Refund;
