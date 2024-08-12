import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiService from "../../api/api";

function ProductDetail() {
  const { id } = useParams();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = new ApiService("http://localhost:3000");

  //   fetching data from api
  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((data) => {
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div>{apiData.name}</div>
      <div>{apiData.price}</div>
      {/* array of image */}
      <img src="" alt="" />
      <div>description</div>
    </div>
  );
}

export default ProductDetail;
