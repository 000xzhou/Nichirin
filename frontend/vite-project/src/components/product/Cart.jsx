import { useCart } from "../../routes/CartProvider";
import ApiService from "../../api/api";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { isUser } = useCustomerAuth();
  const navigate = useNavigate();

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
    if (!isUser) {
      navigate("/login");
    } else {
      const api = new ApiService("http://localhost:3000");

      const res = await api.post(
        `/checkout/${isUser._id}/create-checkout-session`,
        {
          cart,
        }
      );
      // Send to stripe checkout
      window.location.replace(res.url);
    }
  };

  return (
    <div>
      <section>
        <button onClick={handleClearCart}>clear cart</button>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img
                src={item.image}
                alt={`Image of ${item.name}`}
                width="50"
                height="50"
              />
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
      </section>
    </div>
  );
}

export default Cart;
