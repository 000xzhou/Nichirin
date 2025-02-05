import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";

const usePostPassword = (initialState, endpoint) => {
  const [formData, setFormData] = useState(initialState);
  // const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
    try {
      // api
      const api = new ApiService("http://localhost:3000");

      api
        .post(endpoint, formData)
        .then((data) => {
          console.log(data);
          // send them back Login & Security page. (i'm just copying from amazon since I got no design ideas)
          navigate("/customers/edit-info");
        })
        .catch((err) => setError(err));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return [formData, handleChange, handleSubmit, error];
};
export default usePostPassword;
