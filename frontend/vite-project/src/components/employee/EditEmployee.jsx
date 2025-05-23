import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import useGet from "../hooks/useGet";
import { useEmployeeAuth } from "../../routes//EmployeeAuthProvider";

function EditEmployee() {
  const { id } = useParams();
  const { isUser } = useEmployeeAuth();
  const navigate = useNavigate();

  // get rid of anyone that isn't admin or the current user
  useEffect(() => {
    // you login?
    if (isUser === null) {
      navigate("/employee/login");
      return;
    }

    // you have access?
    const isAdmin = isUser.role === "admin" && isUser.status === "active";
    const isSelf = isUser._id === id && isUser.status === "active";

    if (!(isAdmin || isSelf)) {
      navigate("/employee/dashboard");
    }
  }, [isUser, navigate, id]);

  // now that the people we don't want is gone...
  const { apiData: user, loading, error } = useGet(`/employee/${id}`);

  const initialState = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    role: "",
    status: "",
  };
  const [formData, setFormData] = useState(initialState);

  // Update formData when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        role: user.role || "",
        status: user.status || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue;

    if (type === "checkbox") {
      newValue =
        name === "status" ? (checked ? "active" : "inactive") : checked;
    } else {
      newValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      // api
      const API_URL = import.meta.env.VITE_BACKEND_URL;

      const api = new ApiService(API_URL);
      const data = await api.patch(`/employee/${id}`, formData);
      // navigate to profile
      navigate(`/employee/profile/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="editemployee-form-wrapper">
      <form onSubmit={handleSubmit} className="form">
        <div className="flex-gap-0-25">
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={formData.status === "active"}
            onChange={handleChange}
          />
          <label htmlFor="status">active</label>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <div className="flex-gap-0-25">
            <input
              type="radio"
              id="employee"
              name="role"
              value="employee"
              checked={formData.role === "employee"}
              onChange={handleChange}
            />
            <label htmlFor="employee">Employee</label>
          </div>
          <div className="flex-gap-0-25">
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleChange}
            />
            <label htmlFor="admin">Admin</label>
          </div>
        </div>
        <button
          type="submit"
          className="confirm-button padding-point-5 border-radius-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
