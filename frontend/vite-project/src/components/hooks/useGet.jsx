import { useState, useEffect } from "react";
import ApiService from "../../api/api";

const useGet = (endpoint, initialState = null) => {
  const [apiData, setApiData] = useState(null);
  // const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = new ApiService("http://localhost:3000");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((data) => ({
  //     ...data,
  //     [name]: value,
  //   }));
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // api
  //     api
  //       .get(endpoint)
  //       .then((data) => {
  //         console.log(data);
  //         // send them back to the page they were at.
  //       })
  //       .catch((err) => setError(err));
  //   } catch (error) {
  //     console.log(error);
  //     setError(error);
  //   }
  // };
  //   fetching data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        setApiData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const refetch = async () => {
    try {
      const response = await api.get(endpoint);
      setApiData(response);
      console.log(" set here");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    apiData,
    loading,
    error,
    // formData,
    // handleChange,
    // handleSubmit,
    refetch,
  };
};
export default useGet;
