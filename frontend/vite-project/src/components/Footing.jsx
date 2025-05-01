import { Link } from "react-router-dom";
import { useCustomerAuth } from "../routes/CustomerAuthProvider";
import { useState, useEffect } from "react";
import "./footing.css";

function Footing() {
  const { isUser } = useCustomerAuth();
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   if (isUser) {
  //     setUser(isUser._id);
  //   } else {
  //     setUser("");
  //   }
  // }, [isUser]);

  return (
    <>
      <hr className="margin-block-2" />
      <div className="footing-container">
        <section className="footing-section-container">
          <div>
            <article>
              <div>
                <h3>Help</h3>
                {isUser ? (
                  <Link to={`/customers/${isUser._id}`}>My Account</Link>
                ) : (
                  <Link to={`/`}>My Account</Link>
                )}
                <span> | </span>
                {/* <Link to="/about-us">Exchanges & Returns</Link> */}
                <Link to="/contact-us">Contact Us</Link>
                <span> | </span>
                <Link to="/return-policy">Refund Policy</Link>
                <span> | </span>
                <Link to="/faq">FAQ</Link>
              </div>
            </article>
            <article>
              <h3>About</h3>
              <Link to="/about-us">About Us</Link>
              <span> | </span>
              <Link to="/careers">Careers</Link>
              <span> | </span>
              <Link to="/terms">Terms & Conditions</Link>
            </article>
          </div>
          <div>
            <h4>Newsletter</h4>
            <p>
              Stay up to date on the latest cream puffs & sales by signing up to
              our newsletter!
            </p>
            <input
              type="text"
              placeholder="Enter Email Address"
              className="margin-right-point-5 padding-point-5 border-radius-input"
            />
            <button className="main-button text-uppercase border-radius-button padding-point-5 ">
              Join
            </button>
          </div>
        </section>
        <section>
          <div>
            Who is Puffy Pals?
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde,
              corporis natus praesentium sint laboriosam nisi quasi, dolores
              officia velit id dolor quas adipisci ipsum asperiores aspernatur!
              Eius asperiores quaerat enim!
            </p>
          </div>

          <article className="social-icon">
            <a href="http://www.facebook.com" target="_blank">
              <img
                src="https://img.icons8.com/?size=100&id=13912&format=png&color=000000"
                alt="facebook"
              />
            </a>
            <a href="http://www.x.com" target="_blank">
              <img
                src="https://img.icons8.com/?size=100&id=ClbD5JTFM7FA&format=png&color=000000"
                alt="X"
              />
            </a>
            <a href="http://www.instagram.com" target="_blank">
              <img
                src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000"
                alt="instagram"
              />
            </a>
            <a href="http://www.youtube.com" target="_blank">
              <img
                src="https://img.icons8.com/?size=100&id=19318&format=png&color=000000"
                alt="youtube"
              />
            </a>
            <a href="http://www.tiktok.com" target="_blank">
              <img
                src="https://img.icons8.com/?size=100&id=118640&format=png&color=000000"
                alt="tiktok"
              />
            </a>
          </article>
        </section>
      </div>
    </>
  );
}

export default Footing;
