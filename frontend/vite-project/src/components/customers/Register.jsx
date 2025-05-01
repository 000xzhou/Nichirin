import usePostLogin from "../hooks/usePostLogin";

function Register() {
  const initialState = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
  };

  const [formData, handleChange, handleSubmit, error] = usePostLogin(
    initialState,
    "/customers/register"
  );

  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="login-container">
      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="padding-point-5 border-radius-input"
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="padding-point-5 border-radius-input"
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="padding-point-5 border-radius-input"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            value={formData.phone}
            onChange={handleChange}
            className="padding-point-5 border-radius-input"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="padding-point-5 border-radius-input"
          />
        </div>
        <button
          type="submit"
          className="confirm-button padding-point-5 text-uppercase"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
