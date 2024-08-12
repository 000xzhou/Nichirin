import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import ProductE from "./ProductE";

function ProductsListE() {
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
      <div>
        <input type="search" name="search" id="search" />
        <button type="submit">Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Active</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Description</th>
            <th>Images</th>
            <th>Variations</th>
            <th>Details</th>
          </tr>
        </thead>
        {apiData.map(
          (data) =>
            data.active && (
              <ProductE
                key={data._id}
                id={data._id}
                name={data.name}
                price={data.price}
                description={data.description}
                active={data.active}
                stock={data.stock}
                images={data.images}
                variations={data.variations}
              />
            )
        )}
      </table>
    </>
  );
}

export default ProductsListE;
