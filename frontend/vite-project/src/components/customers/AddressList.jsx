import { Link } from "react-router-dom";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import useAddresses from "../hooks/useAddresses";
import "./addresslist.css";

function AddressList() {
  const { isUser } = useCustomerAuth();

  const [handleDelete, setDefaultAdress] = useAddresses(isUser._id);

  return (
    <div>
      <h3>Your Addresses</h3>
      <ul className="addresslist-ul">
        <li className="add-address-container">
          <Link to="add" className="add">
            Add Address
          </Link>
        </li>
        {isUser.addresses.map((address) => (
          <li
            id={address._id}
            key={address._id}
            className="user-address-container"
          >
            <div>
              <p>{address.line1}</p>
              <p>{address.line2 ? address.line2 : ""}</p>
              <p>
                {address.city} {address.state}
              </p>
              <p>{address.country}</p>
            </div>
            <div>
              <Link to={`edit/${address._id}`}>Edit</Link> |{" "}
              <Link
                onClick={() => {
                  handleDelete(address._id);
                }}
              >
                Remove
              </Link>
              {isUser.default_address_id === address._id ? (
                ""
              ) : (
                <>
                  {" | "}{" "}
                  <Link
                    onClick={() => {
                      setDefaultAdress(address._id);
                    }}
                  >
                    Set as Default
                  </Link>
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
