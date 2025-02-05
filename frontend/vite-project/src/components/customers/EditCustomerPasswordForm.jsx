import usePostPassword from "../hooks/usePostPassword";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

function EditCustomerPasswordForm() {
  const { isUser } = useCustomerAuth();

  // password only
  // todo: Create a change password route in server side for validation
  const [formData, handleChange, handleSubmit, error] = usePostPassword(
    { password: "", new: "", renew: "" },
    `/customers/${isUser._id}/password`
  );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor="password">Current password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData}
        onChange={handleChange}
      />
      <label htmlFor="newPassword">New password:</label>
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        value={formData}
        onChange={handleChange}
      />
      <label htmlFor="reenterNewPassword">Reenter new password:</label>
      <input
        type="password"
        id="reenterNewPassword"
        name="reenterNewPassword"
        value={formData}
        onChange={handleChange}
      />
      <button type="submit">Save changes</button>
    </form>
  );
}

export default EditCustomerPasswordForm;
