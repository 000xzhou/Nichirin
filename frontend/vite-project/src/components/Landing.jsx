import { Link } from "react-router-dom";

function Landing() {
  const product = {
    _id: "12345",
    price: 12,
  };

  return (
    <main>
      <div className="slanted-cover"></div>

      <h1>Nichirin</h1>
      <p>Colors of Swords</p>
      {/* // bg hero image  */}
      <img src="" alt="" />
      <Link to="/products" className="big-button">
        Get a demon sword
      </Link>
      <div>
        <div>
          <img src="" alt="" />
          <Link to={`/product/${product._id}`}>title</Link>
          <p>reviews</p>
          <p>price</p>
          <button className="button-54">Add to Cart</button>
        </div>
      </div>
    </main>
  );
}

export default Landing;
