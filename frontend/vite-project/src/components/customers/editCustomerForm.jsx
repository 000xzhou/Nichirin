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

  // const initialState = { [type]: data };
  // need to add onformsubmit in handlesubmit.. should I make a new usePost?
  // { type, userid, data, onFormSubmit }
  const [formData, handleChange, handleSubmit, error] = usePost(
    { [type]: type === "password" ? "" : isUser[type] },
    `/customers/${isUser._id}`
  );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {type === "password" ? (
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor={type}>Current password:</label>
          <input
            type="text"
            id={type}
            name={type}
            value={formData[type]}
            // placeholder={formData[type]}
            onChange={handleChange}
          />
          <label htmlFor={type}>New password:</label>
          <input
            type="text"
            id={type}
            name={type}
            value={formData[type]}
            // placeholder={formData[type]}
            onChange={handleChange}
          />
          <label htmlFor={type}>Reenter new password:</label>
          <input
            type="text"
            id={type}
            name={type}
            value={formData[type]}
            // placeholder={formData[type]}
            onChange={handleChange}
          />
          <button type="submit">Save changes</button>
        </form>
      ) : (
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
      )}
    </>
  );
}

export default EditCustomerForm;
