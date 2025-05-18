import useGet from "../../hooks/useGet";
import { useCustomerAuth } from "../../../routes/CustomerAuthProvider";
import usePost from "../../hooks/usePost";
import { useParams } from "react-router-dom";
import Dropdown from "../../Dropdown";

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
    items: "",
    amount: 0,
  };

  const {
    formData,
    handleChange,
    handleSubmit,
    error: postError,
  } = usePost(initialState, `endpoint`, `return point`);

  if (orderLoading) return <div>Loading...</div>;
  if (orderError) return <div>Error: {orderError.message}</div>;
  console.log(orderApi);
  return (
    <div className="container">
      <h2>Return Items from Order #{orderApi.id}</h2>
      <form onSubmit={handleSubmit}>
        {orderApi.orders.map((order) => (
          <div key={order.id}>
            {/* <input type="checkbox" id="item1" name="item1" value="item1" />
            <label htmlFor="item1">item1</label> */}
            <Dropdown
              label={
                <div>
                  <input
                    type="checkbox"
                    id="item1"
                    name="item1"
                    value="item1"
                  />
                  <label htmlFor="item1">item1</label>
                </div>
              }
            >
              <div>
                <label htmlFor="returns">Reason for return:</label>
                <select name="returns" id="returns">
                  <option value="reason1">reason1</option>
                  <option value="reason2">reason2</option>
                  <option value="reason3">reason3</option>
                  <option value="reason4">reason4</option>
                </select>
              </div>
            </Dropdown>
            {/* {yesReturn && (
              <div>
                <label htmlFor="returns">Reason for return:</label>
                <select name="returns" id="returns">
                  <option value="reason1">reason1</option>
                  <option value="reason2">reason2</option>
                  <option value="reason3">reason3</option>
                  <option value="reason4">reason4</option>
                </select>
              </div>
            )} */}
          </div>
        ))}
        <div>
          <button>Refund</button>
        </div>
      </form>
    </div>
  );
}

export default CustomerRefund;
