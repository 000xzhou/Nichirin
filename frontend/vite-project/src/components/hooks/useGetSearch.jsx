import { useState, useEffect } from "react";
import ApiService from "../../api/api";

const useGetSearch = (endpoint, initialState) => {
  const [apiData, setApiData] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const api = new ApiService(API_URL);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build the query string dynamically
    const queryParams = new URLSearchParams();

    for (const key in formData) {
      if (formData[key]) {
        queryParams.append(key, formData[key]);
      }
    }

    // Full API URL with query parameters
    const url = `${endpoint}?${queryParams.toString()}`;

    try {
      // api
      const data = await api.get(url);
      setApiData(data);
      setLoading(!loading);
      setFormData(initialState);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return { apiData, loading, error, formData, handleChange, handleSubmit };
};
export default useGetSearch;
