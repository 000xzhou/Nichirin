import usePost from "../hooks/usePost";

function EditCustomerForm({ type, userid, data, onFormSubmit }) {
  const initialState = { [type]: data };
  // need to add onformsubmit in handlesubmit.. should I make a new usePost?
  const [formData, handleChange, handleSubmit, error] = usePost(
    initialState,
    `/customers/${userid}`
  );

  if (error) return <div>Error: {error.message}</div>;
  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor={type}>{type}</label>
      <input
        type="text"
        id={type}
        name={type}
        value={formData.email}
        placeholder={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditCustomerForm;
