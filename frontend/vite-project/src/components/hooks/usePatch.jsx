import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

const usePatch = (initialState, endpoint) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const { setIsUser } = useCustomerAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // api
      const api = new ApiService("http://localhost:3000");

      const updatedUser = await api.patch(endpoint, formData);
      console.log("PATCH success:");
      // console.log("PATCH success:", updatedUser);

      // update user
      setIsUser((prevUser) => ({
        ...prevUser,
        ...updatedUser,
      }));

      // send them back
      if (endpoint.includes("address")) {
        navigate("/customers/addresses");
      } else {
        navigate("/customers/login-security");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return [formData, handleChange, handleSubmit, error];
};
export default usePatch;
