import useGet from "../../hooks/useGet";
import { Link } from "react-router-dom";
import Dropdown from "../../Dropdown";
import OrderCard from "./OrderCard";

function Order({
  id,
  sessionId,
  customerId,
  shipping,
  items,
  status,
  totalAmount,
  refund,
  createdAt,
  updatedAt,
}) {
  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  // console.log(shipping);
  return (
    <div>
      <h2>Your Orders</h2>
      <div key={sessionId} className="orders-wrapper">
        <div className="order-amount">
          <div>
            Order Placed <div>{createdAt}</div>
          </div>
          <div>
            Total <div>${totalAmount}</div>
          </div>
          <div>
            Ship to
            <Dropdown label={shipping.name}>
              <div className="dropdown-item">
                <p>{shipping.line1}</p>
                {shipping.line2 && <p>{shipping.line2}</p>}
                <p>
                  {shipping.city} {shipping.state}, {shipping.postal_code}
                </p>
              </div>
            </Dropdown>
          </div>
        </div>
        <section className="order-items">
          <div className="order-detail-group">
            <h3>Arriving? Delivered?</h3>
            {items.map((item) => (
              <div key={item.itemId}>
                {/* <OrderCard key={item._id} itemId={item._id} image={item.image} name={item.name} quantity={item.quantity} price={item.price}/> */}
                <div className="order-item-group">
                  <Link className="item-box">
                    <img src={item.image} width="200px" alt="image" />
                    <div className="item-quantity">{item.quantity}</div>
                  </Link>
                  <Link>{item.name}</Link>
                </div>
                <Link
                  to={`/products/${item.itemId}/reviews/add`}
                  className="secondary-button padding-point-5"
                >
                  Write a product review
                </Link>
              </div>
            ))}
          </div>
          <div className="button-group ">
            <Link className="main-button">Track package</Link>
            <Link className="main-button" to={`/refund/${sessionId}`}>
              Return items
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Order;
