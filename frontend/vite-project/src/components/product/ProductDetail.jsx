import { useParams, Link } from "react-router-dom";
import "./productDetail.css";
import StarRating from "./reviews/StarRating";
import useGet from "../hooks/useGet";
// import useCart from "../hooks/useCart";
import { useCart } from "../../routes/CartProvider";
import Reviews from "./reviews/Reviews";
import { useState } from "react";

function ProductDetail() {
  const { id } = useParams();

  const { apiData, loading, error } = useGet(`/products/${id}`);
  const { handleAddtoCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Add a product to the cart
  const addToCart = () => {
    handleAddtoCart({
      id: apiData._id,
      name: apiData.name,
      price: apiData.price,
      image: apiData.images[0],
    });
  };

  const handleImages = (index) => {
    setCurrentImage(index);
  };
  // console.log(apiData);
  return (
    <div className="container">
      <div>
        <Link to={`/products`} className="flex-gap-0-25">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
          Back
        </Link>
      </div>
      <section className="productDetail">
        <div className="image-container">
          {/* {apiData.images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))} */}
          <img
            src={apiData.images[currentImage]}
            alt={`Image of ${apiData.name}`}
            className="carousel-image"
          />

          <div className="radio-buttons">
            {apiData.images.map((_, index) => (
              <button
                key={index}
                // className={`dot ${currentImage === index ? "active" : ""}`}
                className="material-symbols-outlined"
                onClick={() => handleImages(index)}
              >
                {currentImage === index
                  ? "radio_button_checked"
                  : "radio_button_unchecked"}
              </button>
            ))}
          </div>
        </div>
        <article className="detailBox">
          <div>
            <h3>{apiData.name}</h3>
            <div>
              <div>
                <StarRating rating={apiData.overallRating} />
              </div>
              <Link to={`reviews/add`}>leave a review</Link>
            </div>
            <div className="detailPrice">${apiData.price}</div>
          </div>

          <div>
            <p>
              {/* {apiData.description}  it's an object now. so need to change*/}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quisquam, harum sint aperiam soluta aliquam ea! Molestias odit
              aliquam totam ex? Fugit qui, provident officiis dolor numquam
              ipsum! Alias, consectetur voluptas.
            </p>
          </div>
          {apiData.stock > 0 ? (
            <button
              className="main-button padding-point-5 product_button"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="secondary-button padding-point-5 disable-button product_button"
              disabled
            >
              Sold out
            </button>
          )}
        </article>
      </section>
      <Reviews id={id} />
    </div>
  );
}

export default ProductDetail;
