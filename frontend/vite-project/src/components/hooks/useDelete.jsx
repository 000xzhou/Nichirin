import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate } from "react-router-dom";

const useDelete = (endpoint, returnpoint = null) => {
  const [error, setError] = useState(null);
  const api = new ApiService("http://localhost:3000");
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
