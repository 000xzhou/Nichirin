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
    handleDeleteFromCart,
  } = useCart();

  if (loading) return <div>Loading...</div>;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!isUser) {
      navigate("/login");
    } else {
      // const api = new ApiService("http://localhost:3000");
      // const res = await api.post(`/order/create`, {
      //   cart, // items in cart
      //   customerID: isUser._id,
      //   shipping: isUser.defaultAddressId,
      //   totalAmount: total,
      // });
      // // Send to stripe checkout
      // window.location.replace(res.url);
      navigate("/checkout");
    }
  };

  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <div className="container">
      <section>
        {/* <button onClick={handleClearCart}>clear cart</button> */}
        <ul>
          {cart && cart.length > 0
            ? cart.map((item) => (
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
                  <p className="cart-list-price">{formatPrice(item.price)}</p>
                  <div className="listQytChanger">
                    <span
                      className="listLeftButton material-symbols-outlined"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      {item.quantity === 1 ? "delete" : "remove"}
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={item.quantity}
                      // onChange={(e) => handleInputChange(item.id, e.target.value)}
                      // onBlur={(e) => handleChangeQty(item.id, e.target.value)}
                      readOnly
                    />
                    <span
                      className="listRightButton material-symbols-outlined"
                      onClick={() => handleAddtoCart({ id: item.id })}
                    >
                      add
                    </span>
                    <div
                      className="cart-delete-span"
                      onClick={() => handleDeleteFromCart(item.id)}
                    >
                      delete
                    </div>
                  </div>
                </li>
              ))
            : "Nothing in cart"}
        </ul>
      </section>
      <section className="checkoutSession">
        <div className="checkoutSessionSubtotal">
          subtotal: {formatPrice(total)}
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
