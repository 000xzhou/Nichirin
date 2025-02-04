import { Link } from "react-router-dom";
function AddressList() {
  return (
    <div>
      <h3>Your Addresses</h3>
      <p>
        Maybe I should have an add address area if there is no address and if
        there is an address have the address and have edit and delete? No need
        for default since my db dont have list/array(can add it in) object
      </p>
      <ul>
        <li>
          <Link>Add Address</Link>
        </li>
        <li>
          <div>
            <div>Name</div>
            <div>line1</div>
            <div>line2 (if there is)</div>
            <div>City State zip</div>
          </div>
          <div>
            <Link to="/customers/add-address">Edit |</Link>
            <Link>
              Remove
              {/* remove from db and delete li */}
            </Link>
          </div>
        </li>
        <li>
          <div>
            <div>Name</div>
            <div>line1</div>
            <div>line2 (if there is)</div>
            <div>City State zip</div>
          </div>
          <div>
            <Link>Edit |</Link>
            <Link>Remove</Link>
            <Link>
              | Set as Default
              {/* ??? Not sure how that will work base on how my db is atm. 
              Maybe set it as shipping? and have address as a list?
              Since I don't really care about their address as long as it's ship to the right place and the card matches
              */}
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default AddressList;
