import { Link } from "react-router-dom";
// import useCart from "../hooks/useCart";
import { useCart } from "../../routes/CartProvider";
import ApiService from "../../api/api";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
// import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

function Cart() {
  const { isUser } = useCustomerAuth();

  const {
    cart,
    handleAddtoCart,
    handleRemoveFromCart,
    loading,
    handleClearCart,
  } = useCart();

  if (loading) return <div>Loading...</div>;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const api = new ApiService("http://localhost:3000");

    const res = await api.post(
      `/checkout/${isUser._id}/create-checkout-session`,
      {
        cart,
      }
    );
    console.log(res);
    // redirect
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
                  // onChange={(e) => handleInputChange(item.id, e.target.value)}
                  // onBlur={(e) => handleChangeQty(item.id, e.target.value)}
                  readOnly
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
        <button onClick={handleCheckout}>Go to checkout</button>
        {/* <Link to="/checkout">Go to checkout</Link> */}
      </section>
    </div>
  );
}

export default Cart;
