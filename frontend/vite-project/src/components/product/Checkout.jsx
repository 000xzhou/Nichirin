import { useCart } from "../../routes/CartProvider";
import ApiService from "../../api/api";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useGet from "../hooks/useGet";
import "./checkout.css";

function Checkout() {
  const { isUser } = useCustomerAuth();
  const navigate = useNavigate();

  const { cart } = useCart();
  const {
    apiData: defaultAddress,
    loading: defaultAdressLoading,
    error: defaultAddressError,
  } = useGet(`/address/default/${isUser._id}`);

  const {
    apiData: addresses,
    loading: addressLoading,
    error,
  } = useGet(`/address/addresses/${isUser._id}`);

  const [loading, setLoading] = useState(true);
  const [selectAddress, setSelectAddress] = useState(null);
  const [allAddress, setAllAddress] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(
    selectAddress?._id || null
  );
  // Set default address when it's ready
  useEffect(() => {
    if (defaultAddress && !defaultAdressLoading) {
      setSelectAddress(defaultAddress);
    }
  }, [defaultAddress, defaultAdressLoading]);
  // Set all addresses when it's ready
  useEffect(() => {
    if (addresses && !addressLoading) {
      setAllAddress(addresses);
    }
  }, [addresses, addressLoading]);
  // Set overall loading once both data sources are ready
  useEffect(() => {
    if (!defaultAdressLoading && !addressLoading) {
      setLoading(false); // or true depending on your logic
    }
  }, [defaultAdressLoading, addressLoading]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!isUser) {
      navigate("/login");
    } else {
      const API_URL = import.meta.env.VITE_BACKEND_URL;

      const api = new ApiService(API_URL);

      const res = await api.post(`/order/create`, {
        cart, // items in cart
        customerID: isUser._id,
        shipping: selectAddress.address,
        totalAmount: total,
      });
      // Send to stripe checkout
      window.location.replace(res.url);
    }
  };

  const getAddressList = () => {
    setChangeAddress((prev) => !prev);
  };
  const changleDeliverChange = () => {
    const selected = allAddress.addresses.find(
      (addr) => addr._id === selectedAddressId
    );
    if (selected) {
      setSelectAddress({ address: selected });
      setChangeAddress(false);
    }
  };
  const handleSelectAddress = (event) => {
    setSelectedAddressId(event.target.value);
  };

  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      {changeAddress ? (
        <section className="checkout-all-address">
          <h2>Select a delivery address</h2>
          <ul className="checkout-all-address-ul">
            {allAddress &&
            allAddress.addresses &&
            allAddress.addresses.length > 0 ? (
              allAddress.addresses.map((address) => (
                <li key={address._id}>
                  <label>
                    <input
                      type="radio"
                      name="deliveryAddress"
                      value={address._id}
                      checked={selectedAddressId === address._id}
                      onChange={handleSelectAddress}
                    />
                    <div className="checkout-address">
                      <h5>{address.name}</h5>
                      <p>{address.line1}</p>
                      {address.line2 && <p>{address.line2}</p>}
                      <p>
                        {address.city} {address.state}, {address.postal_code}
                      </p>
                    </div>
                  </label>
                </li>
              ))
            ) : (
              <div>
                No address found
                <Link to={"/customers/addresses"}>
                  <div>
                    <button className="secondary-button padding-point-5 border-radius-button">
                      Add address
                    </button>
                  </div>
                </Link>
              </div>
            )}
          </ul>
          <button
            className="secondary-button padding-point-5 border-radius-button"
            onClick={changleDeliverChange}
            disabled={!selectedAddressId}
          >
            Deliver to this address
          </button>
        </section>
      ) : (
        <section className="checkout-default-address">
          <h2>Delivering to </h2>
          <button
            onClick={getAddressList}
            className="secondary-button padding-point-5 border-radius-button"
          >
            Change
          </button>
          {selectAddress.address ? (
            <div className="checkout-address">
              <h5>{selectAddress.address.name}</h5>
              <p>{selectAddress.address.line1}</p>
              <p>
                {selectAddress.address.line2 && selectAddress.address.line2}
              </p>
              <p>
                {selectAddress.address.city} {selectAddress.address.state}
                {", "}
                {selectAddress.address.postal_code}
              </p>
            </div>
          ) : (
            <div>No default address</div>
          )}
        </section>
      )}
      <section className="checkout-item-list-wrapper">
        {cart.map((item) => (
          <div key={item.id} className="cart-item-list ">
            <div className="cart-list-img-container">
              <img
                src={item.image}
                alt={`Image of ${item.name}`}
                className="cart-list-img"
              />
            </div>
            <div className="cart-list-text-container">
              <div className="cart-list-name">{item.name}</div>
              <div className="cart-list-price">{formatPrice(item.price)}</div>
            </div>
          </div>
        ))}
      </section>
      <section className="checkoutSession">
        <div className="checkoutSessionSubtotal">
          Order Total: {formatPrice(total)}
        </div>
        <button
          className="main-button padding-point-5"
          onClick={handleCheckout}
        >
          Place your order
        </button>
      </section>
    </div>
  );
}

export default Checkout;
