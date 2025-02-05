import usePatch from "../hooks/usePatch";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import { useParams } from "react-router-dom";

function EditAddressForm() {
  // USA shipping only. country should auto fill as usa
  const { isUser } = useCustomerAuth();
  const { addressId } = useParams();

  const address = isUser.addresses.find((addr) => addr._id === addressId);

  const initialState = {
    line1: address.line1,
    line2: address.line2,
    city: address.city,
    state: address.state,
    postal_code: address.postal_code,
    country: "United States",
  };

  const [formData, handleChange, handleSubmit, error] = usePatch(
    initialState,
    `/customers/${isUser._id}/edit-address/${address._id}`
  );

  return (
    <div>
      <h2>Edit your address</h2>
      <div>{error ? error.message : ""}</div>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Add address</button>
      </form>
    </div>
  );
}

export default EditAddressForm;
