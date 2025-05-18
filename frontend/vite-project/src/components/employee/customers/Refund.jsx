import { useParams, Link } from "react-router-dom";
import usePatch from "../../hooks/usePatch";
import { useEmployeeAuth } from "../../../routes/EmployeeAuthProvider";

// isusses refund by employee
function Refund() {
  const { isUser } = useEmployeeAuth();
  const { orderId } = useParams();

  const initialState = {
    customerId: "customerId",
    orderId: "orderId",
    reason: "reason",
  };

  const { formData, handleChange, handleSubmit, error } = usePatch(
    initialState,
    `/orders/refund/${orderId}`,
    "/customers/:customerId/orders???"
  );

  return <div>Refund</div>;
}

export default Refund;
