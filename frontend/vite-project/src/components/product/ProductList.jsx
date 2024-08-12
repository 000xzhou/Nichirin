import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import Product from "./Product";

function ProductsList() {
  const [apiData, setApiData] = useState(null);
  // const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [refetch, setRefetch] = useState(false);

  const api = new ApiService("http://localhost:3000");

  //   fetching data from api
  useEffect(() => {
    api
      .get("/products")
      .then((data) => {
        setApiData(data.products);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {apiData.map(
        (data) =>
          data.active && (
            <Product
              key={data._id}
              name={data.name}
              price={data.price}
              description={data.description}
            />
          )
      )}
    </>
  );
}

export default ProductsList;
