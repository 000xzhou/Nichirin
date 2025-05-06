import usePost from "../hooks/usePost";
import { Link } from "react-router-dom";
import useGet from "../hooks/useGet";
import useGetSearch from "../hooks/useGetSearch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function EditCustomer() {
  const { id } = useParams();

  const {
    apiData: isUser,
    loading,
    error: userError,
    refetch,
  } = useGet(`/customers/${id}`);

  const initialState = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  };

  const [formData, handleChange, handleSubmit, error, handleInitialChange] =
    usePost(initialState, `/customers/${id}`);

  useEffect(() => {
    if (isUser) {
      // check if form is still empty
      handleInitialChange({
        email: isUser.email || "",
        first_name: isUser.first_name || "",
        last_name: isUser.last_name || "",
        phone: isUser.phone || "",
      });
    }
  }, [isUser]);

  if (userError) return <div>There seems to be a problem loading the user</div>;
  if (loading) return <div>loading...</div>;

  return (
    <div className="container">
      {error && <div>There seems to be a problem saving the information</div>}
      <form method="post" onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            placeholder={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            placeholder={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            placeholder={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            placeholder={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="confirm-button padding-point-5">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCustomer;
