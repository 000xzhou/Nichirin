import usePatch from "../hooks/usePatch";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import { useParams } from "react-router-dom";

function EditCustomerForm() {
  const { isUser } = useCustomerAuth();
  const section = useParams();
  let type = section["*"]?.split("/")[1];

  // edit anything wording that needs editing to match db
  let labelType = "";
  if (type === "email") {
    labelType = "Email: ";
  } else if (type === "fname") {
    labelType = "First Name: ";
    type = "first_name";
  } else if (type === "lname") {
    labelType = "Last Name: ";
    type = "last_name";
  } else {
    labelType = "";
  }

  const [formData, handleChange, handleSubmit, error] = usePatch(
    { [type]: isUser[type] },
    `/customers/${isUser._id}`
  );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor={type}>{labelType}</label>
      <input
        type="text"
        id={type}
        name={type}
        value={formData[type]}
        placeholder={formData[type]}
        onChange={handleChange}
      />
      <button type="submit">Save changes</button>
    </form>
  );
}

export default EditCustomerForm;
