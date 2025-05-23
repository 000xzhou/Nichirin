import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";

const usePost = (initialState, endpoint, returnpoint = null) => {
  const [formData, setFormData] = useState(initialState);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleItemChange = (itemId, field, value) => {
    setFormData((prev) => {
      const existing = prev.items[itemId] || {};

      const shouldSetDefaultQty =
        field === "selected" &&
        value === true &&
        existing.quantity === undefined;

      const updatedItem = {
        ...existing,
        [field]: value,
        ...(shouldSetDefaultQty ? { quantity: 1 } : {}),
      };

      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: updatedItem,
        },
      };
    });
  };

  const handleInitialChange = (data) => {
    setFormData(data);
  };

  //   fetching data from api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // api
      const API_URL = import.meta.env.VITE_BACKEND_URL;

      const api = new ApiService(API_URL);

      api
        .post(endpoint, formData)
        .then((data) => {
          setApiData(data);
          // console.log(data);
          if (returnpoint) {
            navigate(returnpoint);
          } else {
            // send them back to the page they were at.
            // console.log("Here at right before nav from", from);
            navigate(from);
          }
        })
        .catch((err) => setError(err));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return {
    formData,
    handleChange,
    handleItemChange,
    handleSubmit,
    error,
    handleInitialChange,
    setError,
    apiData,
  };
};
export default usePost;
