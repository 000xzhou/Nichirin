import { useState } from "react";
import ApiService from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

const usePostLogin = (initialState, endpoint) => {
  const [formData, setFormData] = useState(initialState);
  // const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setIsUser } = useCustomerAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: name === "phone" ? Number(value) : value,
      // [name]: value,
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
          // setApiData(data);
          setIsUser(data.customer);
          if (from) {
            // send them back to the page they were at.
            navigate(from);
          } else {
            navigate("/");
          }
        })
        .catch((err) => setError(err));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return [formData, handleChange, handleSubmit, error];
};
export default usePostLogin;
