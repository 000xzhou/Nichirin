import { useParams } from "react-router-dom";
import "./productDetail.css";
import { Link } from "react-router-dom";
import useGet from "../hooks/useGet";

function EmployeeProductDetail() {
  const { id } = useParams();

  const { apiData, loading, error } = useGet(`/products/${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // console.log(apiData);

  // const setActive = () => {
  //   console.log("here");
  // };

  // const deleteProduct = async () => {
  //   try {
  //     const data = await api.delete(`/products/${id}`);
  //     alert("Product deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //     alert("Failed to delete product. Please try again.");
  //   }
  // };

  return (
    <>
      <div>
        <div>
          {/* <input type="checkbox" name="" id="" /> */}
          <input
            type="checkbox"
            checked={apiData.active}
            onChange={(e) => setActive(e.target.checked)}
          />
          active
          {/* {apiData.active ? <button>Off</button> : <button>On</button>} */}
        </div>

        <div>
          <div>
            <button className="material-symbols-outlined">edit</button>
            <div>Name: {apiData.name} </div>
          </div>
          <div>
            <button className="material-symbols-outlined">edit</button>
            <div>Price: {apiData.price}</div>
          </div>
          <div>
            <button className="material-symbols-outlined">edit</button>
            <div>Stock: {apiData.stock}</div>
          </div>
        </div>

        <div>
          <h3>Description</h3>
          <div>
            <button className="material-symbols-outlined">edit</button>
            {apiData.description.basic && (
              <div>Basic: {apiData.description.basic}</div>
            )}
          </div>
          <div>
            <button className="material-symbols-outlined">edit</button>
            {apiData.description.details && (
              <div>Details: {apiData.description.details}</div>
            )}
          </div>
          <div>
            <button className="material-symbols-outlined">edit</button>
            Features:
            <div>
              {apiData.description.features?.length > 0 && (
                <ul>
                  {apiData.description.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <button className="material-symbols-outlined">edit</button>
              Measurements:
              {apiData.description.measurements?.length > 0 && (
                <ul>
                  {apiData.description.measurements.map((measure, index) => (
                    <li key={index}>{measure}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3>Image</h3>
          <button>Add Image</button>
          {apiData.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
              <button className="material-symbols-outlined">delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EmployeeProductDetail;
