import ProductE from "./ProductE";
import useGet from "../hooks/useGet";
import ApiService from "../../api/api";

function ProductsListE() {
  const { apiData, loading, error, refetch } = useGet(`/products`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const deleteProduct = async (id) => {
    try {
      const api = new ApiService("http://localhost:3000");
      const data = await api.delete(`/products/${id}`);
      if (refetch) refetch();
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

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
            <th>Edit</th>
            <th>Delete</th>
            {/* <th>Description</th> */}
            {/* <th>Images</th> */}
            {/* <th>Variations</th> */}
            {/* <th>Details</th> */}
            <th></th>
          </tr>
        </thead>
        {apiData.products.map((data) => (
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
            deleteProduct={deleteProduct}
          />
        ))}
      </table>
    </>
  );
}

export default ProductsListE;
