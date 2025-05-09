import useGet from "../hooks/useGet";
import { useCustomerAuth } from "../../routes/CustomerAuthProvider";
import { Link } from "react-router-dom";
import "./customerorders.css";
import { useState } from "react";
import Dropdown from "../Dropdown";

// temp db for 1 customer (moving order outside of customers table and into it's own table)
const db = [
  {
    customerId: "customer 1",
    sessionId: "1",
    items: [
      {
        itemId: "item1",
        name: "name 1",
        image:
          "https://preview.redd.it/has-nobody-brought-up-how-delicious-steves-lava-chicken-v0-aqbgsckidhre1.png?auto=webp&s=3145800a134db8c9ee937dcb89f8efdf4bf9c189",
        price: 1,
        quantity: 1,
        shipping: "ref to the shipping id",
      },
      {
        itemId: "item2",
        name: "name 2",
        image:
          "https://preview.redd.it/has-nobody-brought-up-how-delicious-steves-lava-chicken-v0-aqbgsckidhre1.png?auto=webp&s=3145800a134db8c9ee937dcb89f8efdf4bf9c189",
        price: 1,
        quantity: 2,
      },
    ],
    totalAmount: 3,
    status: "completed",
    emailSent: true,
    createdAt: "Jan 1, 1111",
  },
  {
    customerId: "customer 1",
    sessionId: "1",
    items: [
      {
        itemId: "item2",
        name: "name 2",
        image:
          "https://preview.redd.it/has-nobody-brought-up-how-delicious-steves-lava-chicken-v0-aqbgsckidhre1.png?auto=webp&s=3145800a134db8c9ee937dcb89f8efdf4bf9c189",
        price: 1,
        quantity: 2,
      },
      {
        itemId: "item3",
        name: "name 3",
        image:
          "https://preview.redd.it/has-nobody-brought-up-how-delicious-steves-lava-chicken-v0-aqbgsckidhre1.png?auto=webp&s=3145800a134db8c9ee937dcb89f8efdf4bf9c189",
        price: 1,
        quantity: 5,
      },
    ],
    totalAmount: 7,
    status: "pending",
    emailSent: true,
    createdAt: "Jan 4, 1111",
  },
];

function CustomerOrders() {
  // const id = useParams();
  const { isUser } = useCustomerAuth();
  const [isOpen, setIsOpen] = useState(false);
  // const { apiData, loading, error } = useGet(`/order/${isUser._id}/allorders`);
  return (
    <div className="container">
      <h2>Your Orders</h2>
      {db.map((order) => (
        <div key={order.sessionId} className="orders-wrapper">
          <div className="order-amount">
            <div>
              Order Placed <div>{order.createdAt}</div>
            </div>
            <div>
              Total <div>${order.totalAmount}</div>
            </div>
            <div>
              Ship to
              <Dropdown label={"name in shipping"}>
                <div className="dropdown-item">Address of dropdown here</div>
              </Dropdown>
              {/* <div
                className="dropdown"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                name 1
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </div>
              {isOpen && (
                <div className="dropdown-item">
                  <div>Address of dropdown here</div>
                </div>
              )} */}
            </div>
          </div>
          <section className="order-items">
            <div className="order-detail-group">
              <h3>Arriving? Delivered?</h3>
              {order.items.map((item) => (
                <div key={item.itemId}>
                  <div className="order-item-group">
                    <Link className="item-box">
                      <img src={item.image} width="200px" alt="image" />
                      <div className="item-quantity">{item.quantity}</div>
                    </Link>
                    <Link>{item.name}</Link>
                  </div>
                  <Link
                    to={`/products/${item.itemId}/reviews/add`}
                    className="secondary-button padding-point-5"
                  >
                    Write a product review
                  </Link>
                </div>
              ))}
            </div>
            <div className="button-group ">
              <Link className="main-button">Track package</Link>
              <Link className="main-button">Return items</Link>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

export default CustomerOrders;
