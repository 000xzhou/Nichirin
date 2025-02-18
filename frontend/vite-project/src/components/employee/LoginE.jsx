import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate } from "react-router-dom";

function LoginE() {
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
      const data = await api.post("/employee/login", formData);

      console.log("Login successful");

      navigate("/employee/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Employee Login</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
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
