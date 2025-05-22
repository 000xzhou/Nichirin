import usePost from "../hooks/usePost";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const { formData, handleChange, handleSubmit, error } = usePost(
    { newPassword: "", reenterNewPassword: "", token },
    `/customers/reset-password`,
    "/login"
  );

  return (
    <div>
      <div>{error ? <>Error: {error.message}</> : ""}</div>
      <form method="post" onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="newPassword">New password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="reenterNewPassword">Reenter new password:</label>
          <input
            type="password"
            id="reenterNewPassword"
            name="reenterNewPassword"
            value={formData.reenterNewPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="main-button padding-point-5">
            Reset My Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
