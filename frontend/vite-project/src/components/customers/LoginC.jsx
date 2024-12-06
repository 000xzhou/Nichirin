import usePostLogin from "../hooks/usePostLogin";
import { Link } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

function LoginC() {
  // const { handleLogin } = useCustomerAuth();

  // const navigate = useNavigate();
  // const location = useLocation();

  const initialState = {
    email: "",
    password: "",
  };

  const [formData, handleChange, handleSubmit, error] = usePostLogin(
    initialState,
    "/customers/login"
  );

  if (error) return <div>Error: {error.message}</div>;

  // if (apiData) {
  //   // was testing to see if I can get the navbar to auto update without editing usePost (have a usePostLogin to test out other stuff if this don't work.)
  //   // setIsUser(apiData);
  //   const from = location.state?.from?.pathname || "/";
  //   navigate(from);
  // }

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
          type="password"
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
