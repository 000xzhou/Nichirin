import ProductE from "./ProductE";
import useGet from "../../hooks/useGet";
import ApiService from "../../../api/api";
import useGetSearch from "../../hooks/useGetSearch";
import { useState, useEffect } from "react";
import "./productlist.css";

function ProductsListE() {
  const { apiData, loading, error, refetch } = useGet(`/products`);

  const [dataInfo, setDataInfo] = useState(apiData);

  const initialState = {
    name: "",
    price: "",
    stock: "",
  };

  // ! I feel it's better if I just filter out options in the frontend and use onchange with delay then go though the backend.
  const {
    apiData: apiSearchData,
    formData,
    handleChange,
    handleSubmit,
    formError,
  } = useGetSearch(`/products/search`, initialState);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const deleteProduct = async (id) => {
    try {
      const api = new ApiService("http://localhost:3000");
      const data = await api.delete(`/products/${id}`);
      if (refetch) refetch();
      setDataInfo(data);
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setDataInfo(apiSearchData);
  };

  const resetList = () => {
    refetch();
    setDataInfo(apiData);
  };

  return (
    <div className="container">
      <button onClick={resetList} className="secondary-button padding-point-5">
        Reset search
      </button>
      <form onSubmit={onHandleSubmit} className="product-list-search-form">
        {error && <div>{formError.message}</div>}
        <div>Fill in one or more to search:</div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="search"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input
            type="search"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock: </label>
          <input
            type="search"
            name="stock"
            id="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="main-button padding-point-5">
          Search
        </button>
      </form>
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
        {(dataInfo?.products || apiData?.products)?.map((data) => (
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
    </div>
  );
}

export default ProductsListE;
