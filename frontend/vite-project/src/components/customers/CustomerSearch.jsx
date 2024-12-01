import useGetSearch from "../hooks/useGetSearch";
import { useState } from "react";

function CustomerSearch() {
  const initialState = { email: "", fname: "", lname: "", phone: "" };
  const [advanced, setAdvanced] = useState(false);
  const [apiData, loading, error, formData, handleChange, handleSubmit] =
    useGetSearch(`/customers/search`, initialState);

  const toggleAdvanced = () => {
    setAdvanced(!advanced);
  };

  if (!loading)
    return <>apidata here {apiData.customers.map((data) => data.email)}</>;

  return (
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
  );
}

export default CustomerSearch;
