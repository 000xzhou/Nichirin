import useGet from "../hooks/useGet";
import { useParams } from "react-router-dom";

function EmployeeDetail() {
  const { id } = useParams();

  const { apiData, loading, error } = useGet(`/employee/${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(apiData);
  return (
    <div id={apiData._id}>
      <p>{apiData.email}</p>
      <p>{apiData.fname}</p>
      <p>{apiData.lanme}</p>
      <p>{apiData.phone}</p>
      <p>{apiData.role}</p>
      <p>{apiData.status}</p>
      <p>{apiData.created_at}</p>
      <p>{apiData.updated_at}</p>
    </div>
  );
}

export default EmployeeDetail;
