import usePostLogin from "../hooks/usePostLogin";
import { Link } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

function LoginC() {
  const initialState = {
    email: "",
    password: "",
  };

  const { formData, handleChange, handleSubmit, error } = usePostLogin(
    initialState,
    "/customers/login"
  );

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            className="padding-point-5 border-radius-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="padding-point-5 border-radius-input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          className="confirm-button padding-point-5 text-uppercase"
          type="submit"
        >
          Login
        </button>
      </form>
      <Link
        className="forgetpassword text-color-secondary"
        to="/forgetpassword"
      >
        Forget password?
      </Link>
      <div className="margin-top-1 flex-gap-0-25">
        Need an account?
        <Link to="/register" className="text-color-secondary text-uppercase">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default LoginC;
