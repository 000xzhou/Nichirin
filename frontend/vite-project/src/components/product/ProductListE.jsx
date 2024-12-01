import ProductE from "./ProductE";
import useGet from "../hooks/useGet";

function ProductsListE() {
  const [apiData, loading, error] = useGet(`/products`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
        {apiData.products.map(
          (data) =>
            data.active && (
              <ProductE
                key={data._id}
                id={data._id}
                name={data.name}
                price={data.price}
                // description={data.description}
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
