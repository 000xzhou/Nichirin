import { Link } from "react-router-dom";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";

function AddressList() {
  const { isUser } = useCustomerAuth();

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
          <Link to="add">Add Address</Link>
        </li>
        {isUser.addresses.map((address) => (
          <li id={address._id} key={address._id}>
            <div>
              <p>{address.line1}</p>
              <p>{address.line2 ? address.line2 : ""}</p>
              <p>
                {address.city}
                {address.state}
              </p>
              <p>{address.country}</p>
            </div>
            <div>
              <Link to={`edit/${address._id}`}>Edit</Link> | <Link>Remove</Link>
              {isUser.default_address_id === address._id ? (
                ""
              ) : (
                <>
                  {" | "} <Link>Set as Default</Link>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddressList;
