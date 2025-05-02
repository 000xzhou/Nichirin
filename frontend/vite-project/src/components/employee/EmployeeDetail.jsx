import useGet from "../hooks/useGet";
import { useParams, Link } from "react-router-dom";
import "./employeedetail.css";

function EmployeeDetail() {
  const { id } = useParams();

  const { apiData, loading, error } = useGet(`/employee/${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id={apiData._id} className="employeedetail-wrapper">
      <div>
        <span>Email: </span>
        {apiData.email}
      </div>
      <div>
        <span>First Name: </span>
        {apiData.first_name}
      </div>
      <div>
        <span>Last Name: </span>
        {apiData.last_name}
      </div>
      <div>
        <span>Password: </span>******
      </div>
      <div>
        <span>Phone: </span>
        {apiData.phone}
      </div>
      <div>
        <span>Role: </span>
        {apiData.role}
      </div>
      <div>
        <span>Status: </span>
        {apiData.status}
      </div>
      {/* <p>Created at: {apiData.created_at}</p> */}
      {/* <p>Updated at: {apiData.updated_at}</p> */}
      <Link to={`/employee/profile/${apiData._id}/edit`}>
        <div className="main-button padding-point-5 border-radio">Edit</div>
      </Link>
    </div>
  );
}

export default EmployeeDetail;
