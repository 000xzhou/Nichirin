import usePostLogin from "../hooks/usePostLogin";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
// import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

function LoginC({ setIsUser }) {
  // const { setIsUser } = useCustomerAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const initialState = {
    email: "",
    password: "",
  };

  const [formData, handleChange, handleSubmit, error, apiData] = usePostLogin(
    initialState,
    "/customers/login"
  );

  if (error) return <div>Error: {error.message}</div>;

  console.log("api", apiData);
  if (apiData) {
    // console.log("apiData", apiData);
    setIsUser(apiData);
    const from = location.state?.from?.pathname || "/";
    navigate(from);
  }

  return (
    <div>
      <h2>Welcome Back!</h2>
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
      <div>Forget ypassword?</div>
      <div>
        <p>Don&apos;t have an account? </p>
        <span>
          <Link to="/register">Sign Up</Link>
        </span>
      </div>
    </div>
  );
}

export default LoginC;
