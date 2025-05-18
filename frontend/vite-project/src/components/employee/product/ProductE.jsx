import { Link } from "react-router-dom";
import ApiService from "../../../api/api";
import { useState } from "react";

function ProductE({
  id,
  name,
  price,
  description,
  active,
  stock,
  images,
  variations,
  deleteProduct,
}) {
  const api = new ApiService("http://localhost:3000");

  const setActive = async (checked) => {
    // change checked in db using id
    const item = { id: id, active: checked };
    const data = await api.patch(`/products/${id}`, item);
    setIsActive((active) => !active);
    console.log("Active changed");
  };

  // const deleteProduct = async () => {
  //   try {
  //     const data = await api.delete(`/products/${id}`);
  //     alert("Product deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //     alert("Failed to delete product. Please try again.");
  //   }
  // };

  const [isActive, setIsActive] = useState(active);

  return (
    <tbody className="product-list-table">
      <tr id={id}>
        {/* <td>{active ? "Yes" : "No"}</td> */}
        <td>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setActive(e.target.checked)}
          />
          {isActive ? "yes" : "no"}
        </td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{stock}</td>
        <td>
          <button>
            <Link to={id} className="material-symbols-outlined">
              edit
            </Link>
          </button>
        </td>
        <td>
          <button
            className="material-symbols-outlined"
            onClick={() => deleteProduct(id)}
          >
            delete
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default ProductE;
