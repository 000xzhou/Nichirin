import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import StarRating from "./reviews/StarRating";

function Product({ id, name, price, stock, rating, images }) {
  const [, handleAddtoCart] = useCart();
  // Add a product to the cart
  const addToCart = () => {
    handleAddtoCart({
      id: id,
      name: name,
      price: price,
      image: images[0],
    });
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="productBoxImage">
        <img src={images[0]} alt={name} className="product-image" />
      </div>

      {/* Product Details */}
      <div className="product-details">
        <Link className="product-name" to={`/products/${id}`}>
          {name}
        </Link>

        {/* Star Rating */}
        <div className="product-rating">
          <StarRating rating={rating} />
        </div>

        {/* Product Price */}
        <div className="product-price">${price}</div>
      </div>

      {/* Add to Cart Button */}
      {stock > 0 ? (
        <button className="button-54" onClick={addToCart}>
          Add to Cart
        </button>
      ) : (
        <button className="button-54" disabled>
          Sold out
        </button>
      )}
    </div>
  );
}

export default Product;
