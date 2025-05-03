import { useCart } from "../../routes/CartProvider";
import ApiService from "../../api/api";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { Link } from "react-router-dom";

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
        {/* <button onClick={handleClearCart}>clear cart</button> */}
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="cart-item-list">
              <div className="cart-list-img-container">
                <img
                  src={item.image}
                  alt={`Image of ${item.name}`}
                  className="cart-list-img"
                />
              </div>
              <Link to={`/products/${item.id}`}>
                <div className="cart-list-name">{item.name}</div>
              </Link>
              <p className="cart-list-price">${item.price}</p>
              <div className="listQytChanger">
                <button
                  className="listLeftButton"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={item.quantity}
                  // onChange={(e) => handleInputChange(item.id, e.target.value)}
                  // onBlur={(e) => handleChangeQty(item.id, e.target.value)}
                  readOnly
                />
                <button
                  className="listRightButton"
                  onClick={() => handleAddtoCart({ id: item.id })}
                >
                  +
                </button>
                <span className="cart-delete-span">delete</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="checkoutSession">
        <div className="checkoutSessionSubtotal">
          subtotal: ${total.toFixed(2)}
        </div>
        <button
          className="main-button padding-point-5"
          onClick={handleCheckout}
        >
          Go to checkout
        </button>
      </section>
    </div>
  );
}

export default Cart;
