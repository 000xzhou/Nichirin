// import usePost from "../hooks/usePost";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
// import EditCustomerForm from "./EditCustomerForm";

function EditCustomer2() {
  const { isUser } = useCustomerAuth();
  // const [isEditing, setIsEditing] = useState(false);

  // const handleEditDisplay = () => {
  //   setIsEditing(true);
  // };

  // const handleFormSubmit = () => {
  //   setIsEditing(false);
  // };
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
      <h2>Login & Security</h2>
      <ul>
        <li>
          <section>
            <div>
              <span className="bold">Email: </span>
              {isUser.email}
            </div>
            <Link to="email">Edit</Link>
          </section>
          {/*
          Not a fan of how it looks editing on the same page esp when pressing many edit button at the same time without saving so taking it out
          {isEditing && (
            <section>
              <EditCustomerForm
                type="email"
                userid={isUser.id}
                data={isUser.email}
                onFormSubmit={handleFormSubmit}
              />
            </section>
          )} */}
        </li>
        <li>
          <div>
            <span className="bold">First Name: </span>
            {isUser.first_name}
          </div>
          <Link to="fname">Edit</Link>
        </li>
        <li>
          <div>
            <span className="bold">Last Name: </span>
            {isUser.last_name}
          </div>
          <Link to="lname">Edit</Link>
        </li>
        <li>
          <div>
            <span className="bold">Password: </span>
            {/* 
            It give the salted password currently... So it would always be 10
            I don't think it matters if I unsalt it or not here. Just need to check when they change password.
            I should have just put 10 stars instead of getting it and cutting it and replacing it.
            {isUser.password} */}
            {"*".repeat(Math.min(isUser.password.length, 10))}
          </div>
          <Link to="password">Edit</Link>
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

export default EditCustomer2;
