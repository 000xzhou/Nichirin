import useGet from "../../hooks/useGet";
import { Link } from "react-router-dom";
import Dropdown from "../../Dropdown";

function OrderCard({ itemId, image, name, quantity, price }) {
  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <div key={itemId}>
      <div className="order-item-group">
        <Link className="item-box">
          <img src={image} width="200px" alt="image" />
          <div className="item-quantity">{quantity}</div>
        </Link>
        <Link>{name}</Link>
        {/* <Link>{formatPrice(price)}</Link> */}
      </div>
    </div>
  );
}
export default OrderCard;
