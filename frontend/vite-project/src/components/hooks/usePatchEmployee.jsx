import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { useNavigate } from "react-router-dom";

const usePatchEmployee = (initialState, endpoint, returnpoint = null) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

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

      const update = await api.patch(endpoint, formData);
      console.log(update);

      // send them back
      if (returnpoint) {
        navigate(returnpoint);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return { formData, handleChange, handleSubmit, error };
};
export default usePatchEmployee;
