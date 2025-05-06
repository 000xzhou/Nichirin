import useGetSearch from "../hooks/useGetSearch";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./customersearch.css";

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
      <form onSubmit={handleSubmit} className="customer-search-form">
        <div className="customer-search-non-advance">
          <div>
            <label htmlFor="email">Email: </label>
            <input
              className="padding-point-5 border-radius-input"
              type="search"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="flex-gap-0-25 customer-search-button-group">
            <button
              type="submit"
              className="confirm-button padding-point-5 border-radius-button"
            >
              Search
            </button>
            <button
              type="button"
              onClick={toggleAdvanced}
              className="secondary-button padding-point-5 border-radius-button"
            >
              {advanced ? "Hide Advanced" : "Show Advanced"}
            </button>
          </div>
        </div>

        {advanced && (
          <div className="form">
            <div>
              <label htmlFor="fname">First Name: </label>
              <input
                type="search"
                name="fname"
                id="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>

            <div>
              <label htmlFor="lname">Last Name: </label>
              <input
                type="search"
                name="lname"
                id="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>

            <div>
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
          </div>
        )}
      </form>

      {!loading && (
        <>
          {apiData.customers.map((customer) => (
            <div key={customer._id} className="customer-search-result">
              <div>
                <span>First Name:</span> {customer.first_name}
              </div>
              <div>
                <span>Last Name:</span> {customer.last_name}
              </div>
              <div>
                <span>Email:</span> {customer.email}
              </div>
              <div>
                <span>Phone:</span> {customer.phone}
              </div>
              <div>
                <span>Default Address:</span>
                {/** find the address base on id by looking tho the addresses array */}
              </div>
              <div>
                <span>Orders:</span> {customer.orders.map((order) => order)}
              </div>
              <div>
                <span>created at:</span>
                {/** need a function to covert the string into date object and display date only */}
              </div>
              <div className="cusotmer-search-result-button-group">
                <Link to={`${customer._id}/edit`}>
                  <div className="main-button">Edit</div>
                </Link>
                {/* leads to a page that tells you that you send a password reset to the email from backend */}
                <Link to={`${customer._id}/passwordreset`}>
                  <div className="secondary-button">Reset Password</div>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default CustomerSearch;
