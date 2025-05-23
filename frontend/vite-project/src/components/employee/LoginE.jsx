import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./logine.css";
// import { useEmployeeAuth } from "../../routes/EmployeeAuthProvider";

function LoginE() {
  // const { isAuthenticated } = useEmployeeAuth();
  const navigate = useNavigate();

  // forgot that employee context isn't part of login.... Would have to resrtuctre... maybe later
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  // }, [isAuthenticated, navigate]);

  const initialState = {
    email: "",
    password: "",
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
      // api
      const API_URL = import.meta.env.VITE_BACKEND_URL;

      const api = new ApiService(API_URL);
      const data = await api.post("/employee/login", formData);

      console.log("Login successful");

      navigate("/employee/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container employee-login-wrapper">
      <h1>Employee Login</h1>
      {error && <div>{error}</div>}
      <form className="form employee-login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="main-button padding-point-5">
          Login
        </button>
      </form>
      <Link
        to="/employee/forget-password"
        className="forgetpassword text-color-secondary"
      >
        Forget password?
      </Link>
    </div>
  );
}

export default LoginE;
