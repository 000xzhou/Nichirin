import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

const usePatchPassword = (initialState, endpoint) => {
  const [formData, setFormData] = useState(initialState);
  // const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsUser } = useCustomerAuth();

  // console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  //   fetching data from api
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check pw
    if (formData.newPassword === formData.reenterNewPassword) {
      // send to api
      try {
        const API_URL = import.meta.env.VITE_BACKEND_URL;
        // api
        const api = new ApiService(API_URL);

        const updatedUser = await api.patch(endpoint, formData);
        console.log("PATCH success:", updatedUser);

        // update user
        setIsUser((prevUser) => ({
          ...prevUser,
          ...updatedUser,
        }));

        navigate("/customers/login-security");
      } catch (error) {
        console.log(error);
        setError(error);
      }
    } else {
      setError({ message: "Password doesn't match!" });
    }
  };

  return [formData, handleChange, handleSubmit, error];
};
export default usePatchPassword;
