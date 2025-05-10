import { Link } from "react-router-dom";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import "./addresslist.css";
import useGet from "../hooks/useGet";
import Address from "./Address";

function AddressList() {
  const { isUser } = useCustomerAuth();

  const {
    apiData: addressData,
    loading,
    error,
    refetch,
  } = useGet(`/address/addresses/${isUser._id}`);

  if (loading)
    return (
      <div>
        ...loading...I should replace this with a spinning icon by now...
      </div>
    );

  return (
    <div className="container">
      <h3>Your Addresses</h3>
      <ul className="addresslist-ul">
        <li className="add-address-container">
          <Link to="add" className="add">
            Add Address
          </Link>
        </li>
        {addressData.addresses.map((address) => (
          <Address
            key={address._id}
            id={address._id}
            name={address.name}
            line1={address.line1}
            line2={address.line2}
            city={address.city}
            state={address.state}
            country={address.country}
            isDefault={isUser.defaultAddressId === address._id}
            refetch={refetch}
          />
        ))}
      </ul>
    </div>
  );
}

export default AddressList;
