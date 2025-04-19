import useGet from "../hooks/useGet";
import { useParams, Link } from "react-router-dom";

function EmployeeDetail() {
  const { id } = useParams();

  const { apiData, loading, error } = useGet(`/employee/${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id={apiData._id}>
      <p>Email: {apiData.email}</p>
      <p>First Name: {apiData.first_name}</p>
      <p>Last Name: {apiData.last_name}</p>
      <p>Password: ******</p>
      <p>Phone: {apiData.phone}</p>
      <p>Role: {apiData.role}</p>
      <p>Status: {apiData.status}</p>
      {/* <p>Created at: {apiData.created_at}</p> */}
      {/* <p>Updated at: {apiData.updated_at}</p> */}
      <Link to={`/employee/profile/${apiData._id}/edit`}>Edit</Link>
    </div>
  );
}

export default EmployeeDetail;
