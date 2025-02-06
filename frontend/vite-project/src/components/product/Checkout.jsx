import { Link } from "react-router-dom";
// import useCart from "../hooks/useCart";
import { useCart } from "../../routes/CartProvider";

function Checkout() {
  const [
    cart,
    handleAddtoCart,
    handleRemoveFromCart,
    handleChangeQty,
    setCart,
    loading,
    handleClearCart,
  ] = useCart();

  if (loading) return <div>Loading...</div>;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (id, value) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: value } // Update the quantity in the state
          : item
      )
    );
  };

  return (
    <div>
      <section>
        <button onClick={handleClearCart}>clear cart</button>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <p>{item.image}</p>
              <p>{item.name}</p>
              <p>${item.price}</p>
              <div>
                <button onClick={() => handleRemoveFromCart(item.id)}>-</button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={item.quantity}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  onBlur={(e) => handleChangeQty(item.id, e.target.value)}
                />
                <button onClick={() => handleAddtoCart({ id: item.id })}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div>subtotal: ${total.toFixed(2)}</div>
        {/* <button>Go to checkout</button> */}
        <Link to="/checkout">checkout</Link>
      </section>
    </div>
  );
}

export default Checkout;
