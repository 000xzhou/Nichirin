import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

const useDeleteAddress = (userId) => {
  const [error, setError] = useState(null);
  const { setIsUser } = useCustomerAuth();

  const navigate = useNavigate();

  const handleDelete = async (addressId) => {
    try {
      // api
      const api = new ApiService("http://localhost:3000");

      const endpoint = `/customers/${userId}/remove-address/${addressId}`;

      const updatedUser = await api.delete(endpoint);

      // update user
      setIsUser((prevUser) => ({
        ...prevUser,
        ...updatedUser.updatedCustomer,
      }));

      // send them back
      // navigate("/customers/addresses");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return [handleDelete, error];
};
export default useDeleteAddress;
