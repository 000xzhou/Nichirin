import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";

const usePost = (initialState, endpoint) => {
  const [formData, setFormData] = useState(initialState);
  // const [apiData, setApiData] = useState(null);
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

  //   fetching data from api
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // api
      const api = new ApiService("http://localhost:3000");

      api
        .post(endpoint, formData)
        .then((data) => {
          console.log(data);
          // send them back to the page they were at.
          console.log("Here at right before nav from", from);
          navigate(from);
        })
        .catch((err) => setError(err));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return [formData, handleChange, handleSubmit, error];
};
export default usePost;
