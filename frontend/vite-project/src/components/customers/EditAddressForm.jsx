import usePatch from "../hooks/usePatch";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

function EditAddressForm({
  id,
  line1,
  line2,
  city,
  state,
  postal_code,
  country,
}) {
  // USA shipping only. country should auto fill as usa
  const initialState = {
    line1: line1,
    line2: line2,
    city: city,
    state: state,
    postal_code: postal_code,
    country: country,
  };

  const { formData, handleChange, handleSubmit, error } = usePatch(
    initialState,
    `/address/edit-address/${id}`,
    "/customers/addresses",
    true
  );

  return (
    <div className="container">
      <h2>Edit your address</h2>
      <div>{error ? error.message : ""}</div>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="line1">Country:</label>
        <input type="text" value="USA" name="usa" disabled />
        <label htmlFor="line1">Address Line1:</label>
        <input
          type="text"
          id="line1"
          value={formData.line1}
          name="line1"
          onChange={handleChange}
        />

        <label htmlFor="line2">Address Line2:</label>
        <input
          type="text"
          id="line2"
          value={formData.line2}
          name="line2"
          onChange={handleChange}
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={formData.city}
          name="city"
          onChange={handleChange}
        />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          value={formData.state}
          name="state"
          onChange={handleChange}
        />

        <label htmlFor="postal_code">Postal Code:</label>
        <input
          type="text"
          id="postal_code"
          value={formData.postal_code}
          name="postal_code"
          onChange={handleChange}
        />

        <button type="submit" className="confirm-button padding-point-5">
          Add address
        </button>
      </form>
    </div>
  );
}

export default EditAddressForm;
