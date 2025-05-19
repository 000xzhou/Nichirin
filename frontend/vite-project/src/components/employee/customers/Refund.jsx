import { useParams, Link } from "react-router-dom";
import { useEmployeeAuth } from "../../../routes/EmployeeAuthProvider";
import useGet from "../../hooks/useGet";
import usePatchEmployee from "../../hooks/usePatchEmployee";

// isusses refund by employee
function Refund() {
  const { isUser } = useEmployeeAuth();
  const { orderId } = useParams();

  const initialState = {
    customerId: "customerId",
    orderId: "orderId",
    reason: "reason",
  };

  const {
    apiData: refundApi,
    loading,
    error,
  } = useGet("/refund/getAll?status=pending");

  const {
    formData,
    handleChange,
    handleSubmit,
    error: patchError,
  } = usePatchEmployee(
    initialState,
    `/orders/refund/${orderId}`,
    "/customers/:customerId/orders???"
  );

  if (loading) <div>loading...</div>;

  console.log(refundApi);
  return (
    <div>
      <h2>Pending Refunds</h2>
      {refundApi?.length > 0 &&
        refundApi.map((refund) => <div key={refund._id}>{refund._id}</div>)}
    </div>
  );
}

export default Refund;
