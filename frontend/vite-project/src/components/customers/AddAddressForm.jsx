import usePatch from "../hooks/usePatch";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import "./form.css";

function AddAddressForm() {
  // USA shipping only. country should auto fill as usa
  const { isUser } = useCustomerAuth();

  const initialState = {
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "United States",
  };

  const [formData, handleChange, handleSubmit, error] = usePatch(
    initialState,
    `/customers/${isUser._id}/add-address`
  );
  return (
    <div className="container">
      <h2>Add a new address</h2>
      <div>{error ? error.message : ""}</div>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <div>
            <label htmlFor="line1">Country:</label>
          </div>
          <input type="text" value="USA" name="usa" disabled />
        </div>
        <div>
          <div>
            <label htmlFor="line1">Address Line1:</label>
          </div>
          <input
            type="text"
            id="line1"
            value={formData.line1}
            name="line1"
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="line2">Address Line2:</label>
          </div>
          <input
            type="text"
            id="line2"
            value={formData.line2}
            name="line2"
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="city">City:</label>
          </div>
          <input
            type="text"
            id="city"
            value={formData.city}
            name="city"
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="state">State:</label>
          </div>{" "}
          <input
            type="text"
            id="state"
            value={formData.state}
            name="state"
            onChange={handleChange}
          />
        </div>
        <div>
          <div>
            <label htmlFor="postal_code">Postal Code:</label>
          </div>
          <input
            type="text"
            id="postal_code"
            value={formData.postal_code}
            name="postal_code"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="main-button padding-point-5">
            Add address
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAddressForm;
