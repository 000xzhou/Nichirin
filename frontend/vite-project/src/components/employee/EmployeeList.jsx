import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [apiData, setApiData] = useState(null);
  // const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [refetch, setRefetch] = useState(false);
  const [search, setSearch] = useState("");

  const api = new ApiService("http://localhost:3000");

  //   fetching data from api
  useEffect(() => {
    api
      .get("/employee")
      .then((data) => {
        setApiData(data.employees);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = Object.fromEntries(formData.entries());

    try {
      // api
      const api = new ApiService("http://localhost:3000");

      api
        .get(`/employee/search?email=${search}`)
        .then((data) => {
          console.log(data);
          // redirect to detail page of data if there is
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <input
          type="search"
          name="employee"
          id="employee"
          value={search}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
      {apiData.map((data) => (
        <div key={data._id}>
          <p>Email: {data.email}</p>
          <p>
            Name: {data.first_name} {data.last_name}
          </p>
          <p>Status: {data.status}</p>
          <p>Role: {data.role}</p>
          <Link to={`/employee/${data._id}`}>Details</Link>
        </div>
      ))}
    </>
  );
}

export default EmployeeList;
