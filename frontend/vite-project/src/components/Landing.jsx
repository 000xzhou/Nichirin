import { Link } from "react-router-dom";
import "./landing.css";
import useGet from "./hooks/useGet";

function Landing() {
  const { apiData, loading, error } = useGet("/endpoint");
  return (
    <div>
      <section className="landing-container background-accent-transparent">
        <div className="left-hero-container">
          <h1 className="font-42">Whipped to Perfection</h1>
          <p className="line-2 margin-bottom-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            cupiditate ad voluptatibus vel sapiente aspernatur quasi quibusdam
            laboriosam nobis, dolorem voluptas eveniet itaque nisi saepe quas
            fugit nihil quam magnam?
          </p>
          <div className="a-hero-container">
            <Link to="/products" className="main-button a-button-padding">
              Shop Flavors
            </Link>
            <Link to="/products" className="secondary-button a-button-padding ">
              Build Your Box
            </Link>
          </div>
        </div>
        <img src="hero-photo.png" alt="plate of cream puffs right" />
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
