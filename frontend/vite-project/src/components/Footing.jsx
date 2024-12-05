import { Link } from "react-router-dom";
import { useCustomerAuth } from "../routes/CustomerAuthProvider";
import { useState, useEffect } from "react";

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
    <div>
      <section>
        <article>
          <div>
            <h3>Help</h3>
            {isUser ? (
              <Link to={`/customers/${isUser._id}`}>My Account</Link>
            ) : (
              <Link to={`/`}>My Account</Link>
            )}
            <span> | </span>
            <Link to="/about-us">Exchanges & Returns</Link>
            <span> | </span>
            <Link to="/about-us">Contact Us & FAQ</Link>
          </div>
        </article>
        <article>
          <h3>About</h3>
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
