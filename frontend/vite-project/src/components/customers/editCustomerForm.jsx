import usePost from "../hooks/usePost";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import { useParams } from "react-router-dom";

function EditCustomerForm() {
  const { isUser } = useCustomerAuth();
  const section = useParams();
  let type = section["*"]?.split("/")[1];
  // const initialState = { [type]: data };
  // need to add onformsubmit in handlesubmit.. should I make a new usePost?
  // { type, userid, data, onFormSubmit }
  const [formData, handleChange, handleSubmit, error] = usePost(
    type,
    `/customers/${isUser._id}`
  );

  if (error) return <div>Error: {error.message}</div>;

  if (type === "email") {
    type = "Email: ";
  } else if (type === "fname") {
    type = "First Name: ";
  } else if (type === "lanme") {
    type = "Last Name: ";
  } else if (type === "password") {
    type = "Password: ";
  } else {
    type = "";
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor={type}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </label>
      <input
        type="text"
        id={type}
        name={type}
        value={formData.email}
        placeholder={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditCustomerForm;
