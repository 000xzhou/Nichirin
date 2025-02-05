import usePost from "../hooks/usePost";
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

  // todo: I feel I should create seperate usePost instead of using all the same because a lot need checking. and different redirecting
  // todo: right now it redirect to where it come from. Maybe I should add a new param
  // todo: maybe I should write everything out first before using hooks and making new hooks. Then I will just organized and create as needed.

  const [formData, handleChange, handleSubmit, error] = usePost(
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
