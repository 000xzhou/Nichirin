function Item({
  itemId,
  name,
  image,
  price,
  quantity,
  itemData,
  handleItemChange,
  error,
}) {
  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${itemId}`}
        name={name}
        value={name}
        checked={itemData.selected || false}
        onChange={(e) => handleItemChange(itemId, "selected", e.target.checked)}
      />
      <label htmlFor={`checkbox-${itemId}`}>
        <img src={image} alt="image" />
        <div>{name}</div>
        <div>{price}</div>
      </label>
      {itemData.selected && (
        <>
          <div>
            <label htmlFor="quantity">Quantity to return:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) =>
                handleItemChange(itemId, "quantity", Number(e.target.value))
              }
              required
            >
              {Array.from({ length: quantity }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="reason">Why are you returning this?</label>
            <select
              name="reason"
              id="reason"
              onChange={(e) =>
                handleItemChange(itemId, "reason", e.target.value)
              }
              required
            >
              <option value="">Select reason</option>
              <option value="wrong-item">Wrong item</option>
              <option value="damaged">Damaged</option>
              <option value="late">Late delivery</option>
              <option value="changed-mind">Changed mind</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}
export default Item;
