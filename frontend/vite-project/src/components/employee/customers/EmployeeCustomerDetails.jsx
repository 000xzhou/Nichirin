import { useParams, Link } from "react-router-dom";
import useGet from "../../hooks/useGet";

function EmployeeCustomerDetails() {
  const { id } = useParams();

  const {
    apiData: userApi,
    loading: userLoading,
    error: userError,
  } = useGet(`/customers/${id}`);

  const {
    apiData: orderApi,
    loading: orderLoading,
    error: orderError,
  } = useGet(`/refund/${id}`);

  const handleResetPassword = () => {
    // send api to backend to send email to reset password
  };

  return (
    <div>
      <div>
        <div>employee details here</div>
        <div className="cusotmer-search-result-button-group">
          <Link to={`edit`}>
            <div className="main-button">Edit</div>
          </Link>
          <button onClick={handleResetPassword}>
            <div className="secondary-button">Reset Password</div>
          </button>
        </div>
      </div>
      <div>
        Api list of refund requested if any. otherwise empty or say no refund
        order
      </div>
      <div>Api list of refunded orders</div>
      {/* <form>
        <label htmlFor="findOrder">Find Order:</label>
        <input
          type="search"
          name="findOrder"
          id="findOrder"
          placeholder="find order by order ID"
        />

        <label htmlFor="findDate">Find by Date:</label>
        <input type="date" name="findDate" id="findDate" />

        <button type="submit">Search</button>
      </form> */}
    </div>
  );
}

export default EmployeeCustomerDetails;
