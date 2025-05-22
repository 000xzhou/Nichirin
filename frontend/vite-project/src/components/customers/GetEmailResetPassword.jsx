import usePost from "../hooks/usePost";

function GetEmailResetPassword() {
  const { formData, handleChange, handleSubmit, error, apiData } = usePost(
    { email: "" },
    "/customers/forget-password",
    "/check-email"
  );
  console.log(formData);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.value}
          onChange={handleChange}
        />
        <button>Send Reset Link</button>
      </form>
    </div>
  );
}

export default GetEmailResetPassword;
