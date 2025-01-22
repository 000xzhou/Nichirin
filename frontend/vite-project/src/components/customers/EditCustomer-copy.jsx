// import usePost from "../hooks/usePost";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import EditCustomerForm from "./editCustomerForm";

function EditCustomer() {
  const { isUser } = useCustomerAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditDisplay = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = () => {
    setIsEditing(false);
  };
  // const initialState = {
  //   email: isUser.email,
  //   password: isUser.password,
  //   first_name: isUser.first_name,
  //   last_name: isUser.last_name,
  // };
  // const [formData, handleChange, handleSubmit, error] = usePost(
  //   initialState,
  //   `/customers/${isUser._id}`
  // );

  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        <li>
          {!isEditing && (
            <section>
              <div>
                Name: <span>{isUser.email}</span>
              </div>
              <div onClick={handleEditDisplay}>edit</div>
            </section>
          )}
          {isEditing && (
            <section>
              <EditCustomerForm
                type="email"
                userid={isUser.id}
                data={isUser.email}
                onFormSubmit={handleFormSubmit}
              />
            </section>
          )}
        </li>
        <li>
          <div>First Name: {isUser.first_name}</div>
          <div>edit</div>
        </li>
        <li>
          <div>Last Name: {isUser.last_name}</div>
          <div>edit</div>
        </li>
        <li>
          <div>Password: {isUser.password}</div>
          <div>edit</div>
        </li>
      </ul>
      {/* <form action="" method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          placeholder={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="fname">First Name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={formData.fname}
          placeholder={formData.fname}
          onChange={handleChange}
        />
        <label htmlFor="lname">Last Name:</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={formData.lname}
          placeholder={formData.lname}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          placeholder={formData.phone}
          onChange={handleChange}
        />
        <label htmlFor="birthday">Birthday:</label>
        <input
          type="text"
          id="birthday"
          name="birthday"
          value={formData.birthday}
          placeholder={formData.birthday}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
}

export default EditCustomer;
