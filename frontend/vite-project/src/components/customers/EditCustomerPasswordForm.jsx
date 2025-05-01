import usePatchPassword from "../hooks/usePatchPassword";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import "./form.css";

function EditCustomerPasswordForm() {
  const { isUser } = useCustomerAuth();

  // password only
  const [formData, handleChange, handleSubmit, error] = usePatchPassword(
    { oldPassword: "", newPassword: "", reenterNewPassword: "" },
    `/customers/${isUser._id}/password`
  );

  // if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>{error ? <>Error: {error.message}</> : ""}</div>
      <form method="post" onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="oldPassword">Current password:</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </div>
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
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}

export default EditCustomerPasswordForm;
