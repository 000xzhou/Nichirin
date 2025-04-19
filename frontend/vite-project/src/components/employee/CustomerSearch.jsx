import useGetSearch from "../hooks/useGetSearch";
import { useState } from "react";
import { Link } from "react-router-dom";

function CustomerSearch() {
  const initialState = { email: "", fname: "", lname: "", phone: "" };
  const [advanced, setAdvanced] = useState(false);
  const { apiData, loading, error, formData, handleChange, handleSubmit } =
    useGetSearch(`/customers/search`, initialState);

  const toggleAdvanced = () => {
    setAdvanced(!advanced);
  };

  return (
    <>
      {error && <div>{error.message}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="search"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={toggleAdvanced}>
          {advanced ? "Hide Advanced" : "Show Advanced"}
        </button>

        {advanced && (
          <div className="advanced-search">
            <label htmlFor="fname">First Name: </label>
            <input
              type="search"
              name="fname"
              id="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="First Name"
            />

            <label htmlFor="lname">Last Name: </label>
            <input
              type="search"
              name="lname"
              id="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Last Name"
            />

            <label htmlFor="phone">Phone: </label>
            <input
              type="search"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
        )}
      </form>

      {!loading && (
        <>
          {apiData.customers.map((customer) => (
            <div key={customer._id}>
              <div>First Name: {customer.first_name}</div>
              <div>Last Name: {customer.last_name}</div>
              <div>Email: {customer.email}</div>
              <div>Phone: {customer.phone}</div>
              <div>
                Default Address:
                {/** find the address base on id by looking tho the addresses array */}
              </div>
              <div>Orders: {customer.orders.map((order) => order)}</div>
              <div>
                created at:{" "}
                {/** need a function to covert the string into date object and display date only */}
              </div>
              <Link to={`customer/${customer._id}`}>Edit</Link>
              {/* leads to a page that tells you that you send a password reset to the email from backend */}
              <Link to={`/customer/${customer._id}/passwordreset`}>
                Reset Password
              </Link>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default CustomerSearch;
