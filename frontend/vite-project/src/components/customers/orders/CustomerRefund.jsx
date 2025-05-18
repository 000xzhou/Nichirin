import useGet from "../../hooks/useGet";
import { useCustomerAuth } from "../../../routes/CustomerAuthProvider";
import usePost from "../../hooks/usePost";
import { useParams } from "react-router-dom";

function CustomerRefund() {
  const { isUser, setIsUser } = useCustomerAuth();
  const { orderId } = useParams();
  const {
    apiData: orderApi,
    loading: orderLoading,
    error: orderError,
  } = useGet(`/order/${orderId}`);

  const initialState = {
    customerId: isUser._id,
    orderId: orderId,
    reason: "",
  };

  const {
    formData,
    handleChange,
    handleSubmit,
    error: postError,
  } = usePost(initialState, `endpoint`, `return point`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Do you want to return those items?</h3>
          <input type="checkbox" id="item1" name="item1" value="item1" />
          <label htmlFor="item1"></label>
          <input type="checkbox" id="item2" name="item1" value="item1" />
          <label htmlFor="item2"></label>
        </div>
        <div>
          <label htmlFor="returns">Reason for return:</label>
          <select name="returns" id="returns">
            <option value="reason1">reason1</option>
            <option value="reason2">reason2</option>
            <option value="reason3">reason3</option>
            <option value="reason4">reason4</option>
          </select>
          <button>Refund</button>
        </div>
      </form>
    </div>
  );
}

export default CustomerRefund;
