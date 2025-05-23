import { Link } from "react-router-dom";
import "./landing.css";
import useGet from "./hooks/useGet";
import Product from "./product/Product";

// mock db for landing
const db = {
  bannerMobile: "https://i.postimg.cc/8cMfXP9X/mincraft-mobilel-screen.png",
  bannerDesktop: "https://i.postimg.cc/d0gTB30J/minecraft-full-screen.png", // image url
  title: "Puffy Pals X Minecraft",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. oriosam nobis, dolorem voluptas eveniet itaque nisi saepe quas Voluptate cupiditate ad voluptatibus vel sapie",
  "product-tag": "mincraft", // the current product display in frontpage
  displayTag: "minecraft", // the current product tag in frontpage
};

function Landing() {
  const { apiData, loading, error } = useGet(
    `/products/search?tags=${db.displayTag}`
  );

  return (
    <div>
      <section className="hero">
        <img
          src={db.bannerDesktop}
          alt="cream puff image"
          className="hero-background desktop-image"
        />
        <img
          src={db.bannerMobile}
          alt="cream puff image"
          className="hero-background mobile-image"
        />
        <div className="hero-content">
          <h1 className="font-42">{db.title}</h1>
          <p className="line-2 margin-bottom-2">{db.content}</p>
          <div className="a-hero-container">
            <Link to="/products" className="main-button a-button-padding">
              Shop Flavors
            </Link>
            <Link to="/products" className="secondary-button a-button-padding ">
              Build Your Box
            </Link>
          </div>
        </div>
      </section>
      <section className="landing-popular-item">
        <h2>Features</h2>
        <div className="productList container">
          {!loading &&
            apiData.products.map((item) => (
              <Product
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                stock={item.stock}
                rating={item.overallRating}
                images={item.images}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default Landing;
