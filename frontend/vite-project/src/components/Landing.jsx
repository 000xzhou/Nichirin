import { Link } from "react-router-dom";
import "./landing.css";
import useGet from "./hooks/useGet";
import "./landing-main.modules.css";

// mock db for landing
const db = {
  bannerMobile: "https://i.postimg.cc/8cMfXP9X/mincraft-mobilel-screen.png",
  bannerDesktop: "https://i.postimg.cc/d0gTB30J/minecraft-full-screen.png", // image url
  title: "Puffy Pals X Minecraft",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. oriosam nobis, dolorem voluptas eveniet itaque nisi saepe quas Voluptate cupiditate ad voluptatibus vel sapie",
  "product-tag": "mincraft", // the current product display in frontpage
};

function Landing() {
  const { apiData, loading, error } = useGet("/products/tags?tag=minecraft");
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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia,
        accusamus et voluptas nesciunt distinctio sint quae voluptates. Expedita
        quo, tempore ea laudantium voluptate, accusamus unde, cumque labore enim
        itaque debitis. A place to buy some feature puffs
      </section>
    </div>
  );
}

export default Landing;
