import usePatch from "../hooks/usePatch";

function EditAddressForm() {
  // USA shipping only. country should auto fill as usa

  return (
    <div>
      {/* <h1>
        Edit {type === "billing" ? "Billing" : "Shipping"} : Use for post method
      </h1> */}
      <form method="patch">
        <label htmlFor="line1">Line1:</label>
        <input type="text" id="line1" />
        <label htmlFor="line2">Line2:</label>
        <input type="text" id="line2" />
        <label htmlFor="city">City:</label>
        <input type="text" id="city" />
        <label htmlFor="state">State:</label>
        <input type="text" id="state" />
        <label htmlFor="code">Postal Code:</label>
        <input type="text" id="code" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditAddressForm;
