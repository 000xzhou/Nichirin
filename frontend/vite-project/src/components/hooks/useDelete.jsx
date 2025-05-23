import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate } from "react-router-dom";

const useDelete = (endpoint, returnpoint = null) => {
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const api = new ApiService(API_URL);
  const navigate = useNavigate();
  const [returnData, setReturnData] = useState(null);

  const handleDelete = async () => {
    try {
      // api
      const deleteData = await api.delete(endpoint);
      setReturnData(deleteData);
      if (returnpoint) {
        navigate(returnpoint);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return { handleDelete, error, returnData };
};
export default useDelete;
