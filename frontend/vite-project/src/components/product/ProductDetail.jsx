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

  // temp db - table: review rating [useGet review with item id of this product]
  /**
   * ! I should add an overall rating in the product table.
   * And update that nubmer anytime a new review is added.
   * So I don't have to pull up all the reviews everytime.
   */
  const db = [
    {
      "review-id": "1",
      "user-id": "user 1", // link to user table
      "user-f-name": "user 1", // so I don't have to look cross-ref it
      rating: 1,
      title: "review title",
      post: "reviw post",
      "created-at": "some date",
      "item-id": "item1",
    },
    {
      "review-id": "2",
      "user-id": "user 2",
      "user-f-name": "user 2",
      rating: 2,
      title: "review title 2",
      post: "reviw post 2",
      "created-at": "some date",
      "item-id": "item1",
    },
    {
      "review-id": "3",
      "user-id": "user 3",
      "user-f-name": "user 3",
      rating: 3,
      title: "review title 3",
      post: "reviw post 3",
      "created-at": "some date",
      "item-id": "item1",
    },
    {
      "review-id": "4",
      "user-id": "user 4",
      "user-f-name": "user 4",
      rating: 4,
      title: "review title 4",
      post: "reviw post 4",
      "created-at": "some date",
      "item-id": "item1",
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // do math for rating
  const ratingMath = () => {
    let total = 0;
    db.map((item) => {
      total += item.rating;
    });

    return total / db.length;
  };

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
                <StarRating rating={ratingMath()} />
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
        {/* <div>
            <h3>Details</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              earum assumenda provident similique nemo, libero placeat omnis,
              perspiciatis consectetur culpa ex minima illum unde eaque fuga
              iure? Suscipit, corrupti deserunt?
            </p>
          </div>
          <div>
            <h3>Features</h3>
            <ul>
              <li>Hand Sharpened, Full Tang, Battle Ready Sword</li>
              <li>Hand Sharpened, Full Tang, Battle Ready Sword</li>
              <li>Hand Sharpened, Full Tang, Battle Ready Sword</li>
              <li>Hand Sharpened, Full Tang, Battle Ready Sword</li>
              <li>Hand Sharpened, Full Tang, Battle Ready Sword</li>
              <li>Craft Time: 2-3 Weeks</li>
            </ul>
          </div>
          <div>
            <h3>Measurements</h3>
            <ul>
              <li>
                Handle Length: <span>10.6`&quot`</span>
              </li>
              <li>
                Handle Length: <span>10.6`&quot`</span>
              </li>
              <li>
                Handle Length: <span>10.6`&quot`</span>
              </li>
              <li>
                Handle Length: <span>10.6`&quot`</span>
              </li>
              <li>
                Handle Length: <span>10.6`&quot`</span>
              </li>
              <li>
                Handle Length: <span>10.6`&quot`</span>
              </li>
            </ul>
          </div> */}
      </section>

      <Reviews id={id} />
    </div>
  );
}

export default ProductDetail;
{
  /* <div>
            <select id="qty" name="qty">
              <option value="1">Quiantity: 1</option>
              <option value="2">Quiantity: 2</option>
              <option value="3">Quiantity: 3</option>
              <option value="4">Quiantity: 4</option>
            </select>
          </div> */
}
