import useGet from "../hooks/useGet";
import { useParams, Link } from "react-router-dom";
import EditAddress from "./EditAddress";
import EditC from "./EditC";

function CustomerDetail() {
  const { id } = useParams();
  // const { "customer-id": id } = useParams();

  const [apiData, loading, error] = useGet(`/customers/${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // console.log(apiData);
  return (
    <div id={apiData._id}>
      <div>email: {apiData.email}</div>
      <p>Edit</p>
      {/* <EditC /> */}
      <p>Edit Address</p>
      {/* <EditAddress /> */}
      <p>Edit Shipping</p>
      {/* <EditAddress /> */}
      {/* <Link to="/customers/edit-info">edit info</Link> */}
      {/* <Link to="/customers/edit-address">edit address</Link> */}
      {/* <Link to="/customers/edit-shipping">edit shipping</Link> */}
    </div>
  );
}

export default CustomerDetail;
