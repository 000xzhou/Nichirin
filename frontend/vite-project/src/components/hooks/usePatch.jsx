import { useState, useEffect } from "react";
import ApiService from "../../api/api";

const usePatch = (endpoint, formdata = {}) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   fetching data from api
  useEffect(() => {
    const api = new ApiService("http://localhost:3000");

    try {
      api.patch(endpoint, formdata).then((data) => {
        setApiData(data);
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, formdata]);

  return [apiData, loading, error];
};
export default usePatch;
