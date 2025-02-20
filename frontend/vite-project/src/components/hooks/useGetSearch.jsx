import { useState, useEffect } from "react";
import ApiService from "../../api/api";

const useGet = (endpoint, initialState) => {
  const [apiData, setApiData] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = new ApiService("http://localhost:3000");

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
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return [apiData, loading, error, formData, handleChange, handleSubmit];
};
export default useGet;
