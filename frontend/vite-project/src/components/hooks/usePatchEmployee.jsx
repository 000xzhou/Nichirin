import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { useNavigate } from "react-router-dom";

const usePatchEmployee = (initialState, returnpoint = null) => {
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
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const api = new ApiService(API_URL);

  const handleStatusChange = async (e, endpoint, newStatus) => {
    e.preventDefault();
    try {
      const patchData = {
        ...formData,
        status: newStatus,
      };

      const update = await api.patch(endpoint, patchData);
      console.log(update);
      // maybe refetch or update UI
    } catch (err) {
      console.error("Failed to update refund:", err);
    }
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    try {
      // api
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

  return { formData, handleChange, handleSubmit, error, handleStatusChange };
};
export default usePatchEmployee;
