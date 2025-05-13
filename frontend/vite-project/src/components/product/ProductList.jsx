import Product from "./Product";
import "./product.css";
import useGet from "../hooks/useGet";

function ProductsList() {
  const { apiData, loading, ListError } = useGet(`/products`);

  if (loading) return <div>Loading...</div>;
  if (ListError) return <div>Error: {ListError.message}</div>;

  return (
    <div className="productList container">
      {apiData.products.map(
        (data) =>
          data.active && (
            // data.stock > 0 &&
            <Product
              key={data._id}
              id={data._id}
              name={data.name}
              price={data.price}
              stock={data.stock}
              rating={data.overallRating}
              images={data.images}
            />
          )
      )}
    </div>
  );
}

export default ProductsList;
