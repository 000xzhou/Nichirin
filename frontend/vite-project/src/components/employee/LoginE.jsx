import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate } from "react-router-dom";
// import { useEmployeeAuth } from "../../routes/EmployeeAuthProvider";

function LoginE() {
  // const { setIsAuthenticated } = useEmployeeAuth();

  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      const api = new ApiService("http://localhost:3000");

      api
        .post("/employee/login", formData)
        .then((data) => {
          console.log("Login successful");
          // Redirect based on user type
          // setIsAuthenticated(true);
          navigate("/employee/dashboard");
        })
        .catch((err) => {
          console.error("Error logging in:", err);
          setError("Invalid credentials, please try again.");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Employee Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        {error && <p>{error}</p>}
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginE;
