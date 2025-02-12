import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { useEmployeeAuth } from "../../routes//EmployeeAuthProvider";
import { useNavigate } from "react-router-dom";

function CreateE() {
  const { isUser } = useEmployeeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUser && isUser.role !== "admin" && isUser.status === "active") {
      navigate("/employee/dashboard");
    }
  }, [isUser, navigate]);

  const initialState = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    role: "",
    status: "active",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      // api
      const api = new ApiService("http://localhost:3000");
      const data = await api.post("/employee/create", formData);
      // set new employee in isUser
      console.log(data);
      // navigate to dashboard
      navigate("/employee/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          onChange={handleChange}
          value={formData.first_name}
        />
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          onChange={handleChange}
          value={formData.last_name}
        />
        {/*
        Should send a default or random password and have them reset it
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        /> */}
        <label htmlFor="phone">Phone:</label>
        <input
          type="tele"
          id="phone"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
        />
        <label htmlFor="role">Role:</label>
        <div>
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
        <div>
          <input
            type="radio"
            id="customer"
            name="role"
            value="admin"
            checked={formData.role === "admin"}
            onChange={handleChange}
          />
          <label htmlFor="customer">Admin</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateE;
