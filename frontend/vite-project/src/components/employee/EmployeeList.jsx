import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEmployeeAuth } from "../../routes//EmployeeAuthProvider";
import "./employeelist.css";

function EmployeeList() {
  const { isUser } = useEmployeeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUser && isUser.role !== "admin" && isUser.status === "active") {
      navigate("/employee/dashboard");
    }
  }, [isUser, navigate]);

  const [apiData, setApiData] = useState(null);
  // const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [refetch, setRefetch] = useState(false);
  const [search, setSearch] = useState("");
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const api = new ApiService(API_URL);
  //   fetching data from api
  useEffect(() => {
    api
      .get("/employee")
      .then((data) => {
        setApiData(data.employees);
        setLoading(false);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // api
      const api = new ApiService(API_URL);
      // search only work on emails
      const data = await api.get(`/employee/search?email=${search}`);

      console.log(data);
      // redirect to detail page of data if there is
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div>
        <label htmlFor="search">Email: </label>
        <input
          type="search"
          name="employee"
          id="employee"
          value={search}
          onChange={handleChange}
          className="padding-point-5"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="confirm-button border-radius-button padding-point-5"
        >
          Search
        </button>
      </div>
      <div className="employee-list-data-wrapper">
        {apiData.map((data) => (
          <div key={data._id} className="employee-list-data">
            <p className="employee-list-email">Email: {data.email}</p>
            <p className="employee-list-name">
              Name: {data.first_name} {data.last_name}
            </p>
            <p className="employee-list-phone">Phone: {data.phone}</p>
            <p className="employee-list-role">
              Status:{" "}
              <span
                className={data.status === "active" ? "text-green" : "text-red"}
              >
                {data.status}
              </span>
            </p>
            <p className="employee-list-status">
              Role: <span>{data.role}</span>
            </p>
            <Link to={`/employee/profile/${data._id}/edit`}>
              <div className="employee-list-edit main-button padding-point-5 border-radius-button">
                Edit
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
