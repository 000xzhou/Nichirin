import usePost from "../hooks/usePost";
import { Link } from "react-router-dom";

function EditCustomer() {
  // get after customer press edit in their page
  let id = 13456;

  const initialState = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  };
  const [formData, handleChange, handleSubmit, error] = usePost(
    initialState,
    `/customers/${id}`
  );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form action="" method="post">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" />
        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" />
        <label htmlFor="lname">Last Name:</label>
        <input type="text" id="lname" />
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" />
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" />
        <label htmlFor="birthday">Birthday:</label>
        <input type="text" id="birthday" />
        {/* <h3>Address:</h3>
        <input type="text" id="line1" />
        <input type="text" id="line2" />
        <input type="text" id="city" />
        <input type="text" id="state" />
        <input type="text" id="postal_code" />
        <h3>Shipping:</h3>
        <input type="text" id="s-line1" />
        <input type="text" id="s-line2" />
        <input type="text" id="s-city" />
        <input type="text" id="s-state" />
        <input type="text" id="s-postal_code" /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditCustomer;
