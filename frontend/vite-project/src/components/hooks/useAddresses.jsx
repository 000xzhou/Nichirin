import { useState } from "react";
import ApiService from "../../api/api";
// import { useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

const useAddresses = (userId) => {
  const [error, setError] = useState(null);
  const { setIsUser } = useCustomerAuth();
  const api = new ApiService("http://localhost:3000");

  const handleDelete = async (addressId) => {
    try {
      // api
      const endpoint = `/address/remove-address/${addressId}`;

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

  const setDefaultAdress = async (addressId) => {
    try {
      const endpoint = `/customers/${userId}/default-address/${addressId}`;

      const updatedUser = await api.patch(endpoint);

      setIsUser((prevUser) => ({
        ...prevUser,
        ...updatedUser.updatedCustomer,
      }));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return [handleDelete, setDefaultAdress, error];
};
export default useAddresses;
