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
  return (
    <tbody>
      <tr id={id}>
        <td>{active ? "Yes" : "No"}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{stock}</td>
        <td>{description}</td>
        <td>
          <button>Image icon</button>
        </td>
        <td>
          <button>List icon</button>
        </td>
        <td>
          <button>
            <span className="material-symbols-outlined">edit</span>
          </button>
        </td>
      </tr>
    </tbody>
  );
}

export default ProductE;
