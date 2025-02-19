import { Link } from "react-router-dom";

function ProductE({
  id,
  name,
  price,
  description,
  active,
  stock,
  images,
  variations,
}) {
  const setActive = () => {
    // change checked in db using id
  };

  return (
    <tbody>
      <tr id={id}>
        {/* <td>{active ? "Yes" : "No"}</td> */}
        <td>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
        </td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{stock}</td>
        {/* <td>{description}</td> */}
        {/* <td>
          <button>Image icon</button>
        </td>
        <td>
          <button>List icon</button>
        </td> */}
        <td>
          <button>
            <Link to={id} className="material-symbols-outlined">
              edit
            </Link>
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default ProductE;
