import { useParams } from "react-router-dom";
import "./productDetail.css";
import { Link } from "react-router-dom";
import StarRating from "./reviews/StarRating";
import useGet from "../hooks/useGet";
// import useCart from "../hooks/useCart";
import { useCart } from "../../routes/CartProvider";

function ProductDetail() {
  const { id } = useParams();

  const [apiData, loading, error] = useGet(`/products/${id}`);
  const { handleAddtoCart } = useCart();

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

  const handleToRight = () => {
    console.log("move right");
    // arrow to right
  };
  const handleToLeft = () => {
    console.log("move left");
    // arrow to left
  };
  // console.log(apiData);
  return (
    <>
      <section className="productDetail">
        <div className="imageBox">
          {apiData.images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>
        <article className="detailBox">
          <div>
            <h3>{apiData.name}</h3>
            <div>
              <div>
                <StarRating rating={4.5} />
              </div>
              <Link to={`/reviews/create/${id}`}>leave a review</Link>
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
            <button className="button-54 product_button" onClick={addToCart}>
              Add to Cart
            </button>
          ) : (
            <button className="button-54" disabled>
              Sold out
            </button>
          )}
        </article>
        <article>
          <div>
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
          </div>
          <div>
            <h2>Latest reviews</h2>
            <div className="reviewBox">
              <div className="reviewDetailBox">
                <div>review first name only</div>
                <div>review star</div>
                <h4>Reivew TItle</h4>
                <p>review text</p>
              </div>
              <div className="reviewDetailBox">
                <div>review first name only</div>
                <div>review star</div>
                <h4>Reivew TItle</h4>
                <p>review text</p>
              </div>
              <div className="reviewDetailBox">
                <div>review first name only</div>
                <div>review star</div>
                <h4>Reivew TItle</h4>
                <p>review text</p>
              </div>
            </div>
            <div className="button-container">
              <Link to={`/reviews/${id}`}>More</Link>
              <Link to={`/reviews/${id}`}>Write a review</Link>
            </div>
          </div>
        </article>
      </section>
      {/* 
      <section>
        <h2>People Also Viewed</h2>
        <div className="scroll-container">
          <button className="prev" onClick={handleToLeft}>
            ←
          </button>
          <div className="alsoView">
            <div className="box">
              <img src="some.jpg" alt="some" />
              <Link>title</Link>
              <p>$20</p>
            </div>
            <div className="box">
              <img src="some.jpg" alt="some" />
              <Link>title</Link>
              <p>$20</p>
            </div>
            <div className="box">
              <img src="some.jpg" alt="some" />
              <Link>title</Link>
              <p>$20</p>
            </div>
            <div className="box">
              <img src="some.jpg" alt="some" />
              <Link>title</Link>
              <p>$20</p>
            </div>
            <div className="box">
              <img src="some.jpg" alt="some" />
              <Link>title</Link>
              <p>$20</p>
            </div>
            <button className="next" onClick={handleToRight}>
              →
            </button>
          </div>
        </div>
      </section> */}
    </>
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
