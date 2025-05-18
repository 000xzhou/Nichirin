import { useParams, Link } from "react-router-dom";

function EmployeeCustomerDetails() {
  const { id } = useParams();

  const {
    apiData: isUser,
    loading,
    error: userError,
    refetch,
  } = useGet(`/customers/${id}`);

  const initialState = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  };

  return <div>employee customer details</div>;
}

export default EmployeeCustomerDetails;
