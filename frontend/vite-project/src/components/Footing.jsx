import { Link } from "react-router-dom";
function Footing() {
  return (
    <div>
      <section>
        <article>
          <div>
            <p>Help</p>
            <Link to="/customers/66c64187549e58cbe00a3ae4">My Account</Link>
            <span> | </span>
            <Link to="/about-us">Exchanges & Returns</Link>
            <span> | </span>
            <Link to="/about-us">Contact Us & FAQ</Link>
          </div>
        </article>
        <article>
          <p>About</p>
          <Link to="/about-us">About Us</Link>
          <span> | </span>
          <Link to="/about-us">Careers</Link>
          <span> | </span>
          <Link to="/about-us">Terms & Conditions</Link>
        </article>
      </section>
      <article>
        <div>facebook</div>
        <div>twitter</div>
        <div>instgram</div>
        <div>youtube</div>
        <div>ticktoc</div>
      </article>
      {/* <div>
        <h4>Newsletter</h4>
        <p>
          Stay up to date on the latest swords & sales by signing up to our
          newsletter!
        </p>
        <input type="text" placeholder="Enter Email Address" />
        <button>Join</button>
      </div> */}
    </div>
  );
}

export default Footing;
