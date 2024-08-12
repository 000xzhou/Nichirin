import { useState } from "react";
import ApiService from "../api/api";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = Object.fromEntries(formData.entries());

    try {
      // api
      const api = new ApiService("http://localhost:3000");

      api
        .post("/employee/login", formData)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Welcome Back!</h2>
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
          type="text"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
