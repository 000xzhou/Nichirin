import { Link } from "react-router-dom";
import { useState } from "react";
import ApiService from "../../../api/api";
import DropDown from "../../Dropdown";
import "./refundsearch.css";
import Refund from "../../employee/customers/Refund";

function RefundSearch({ itemId, image, name, quantity, price }) {
  const [searchType, setSearchType] = useState("refundId");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const updateInputName = (e) => {
    setSearchType(e.target.value);
  };
  const updateInputValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ [searchType]: searchValue });
    try {
      const api = new ApiService(API_URL);

      const params = new URLSearchParams({
        searchType,
        searchValue,
      });
      const data = await api.get(`/refund/findByQuery?${params.toString()}`);

      console.log("Hereeee", data);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const statusColorMap = {
    approved: "text-green",
    pending: "text-yellow",
    rejected: "text-red",
  };

  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="refund-form">
        <label htmlFor="searchId">Search </label>
        <select
          name="searchId"
          id="searchId"
          value={searchType}
          onChange={updateInputName}
        >
          <option value="refundId">Refund ID</option>
          <option value="orderId">Order ID</option>
          <option value="customerId">Customer ID</option>
        </select>
        <input
          type="text"
          id="searchInput"
          name={searchType}
          value={searchValue}
          onChange={updateInputValue}
        />
        <button
          type="submit"
          className="main-button padding-point-5 border-radius-button"
        >
          Search
        </button>
      </form>
      {searchResult && searchResult.length > 0 && (
        <section>
          {searchResult.map((result) => (
            <div key={result._id} className="searchResult-container">
              <h3>Refund ID: {result._id}</h3>
              <div className="refundsearchDropdown">
                <DropDown label={"Refund Info"}>
                  <div>
                    Status:{" "}
                    <span className={statusColorMap[result.status]}>
                      {result.status}
                    </span>
                  </div>
                  <div>Requested At date: {result.requestedAt}</div>
                  <div>
                    Processed At date:{" "}
                    {result.reviewedAt ? (
                      result.reviewedAt
                    ) : (
                      <span className="text-yellow">Pending</span>
                    )}
                  </div>
                  <div>
                    Processed By:{" "}
                    {result.processedBy ? (
                      result.processedBy._id
                    ) : (
                      <span className="text-yellow">Pending</span>
                    )}
                  </div>
                  <div>Refund Amount: {formatPrice(result.amount)}</div>
                  <div>Note: {result.note ? result.note : "None"}</div>
                </DropDown>
              </div>
              <div className="refundsearchDropdown">
                <DropDown label={"Customer Info"}>
                  <div>Customer ID: {result.customerId._id}</div>
                  <div>Customer Email: {result.customerId.email}</div>
                  <div>
                    Customer Name: {result.customerId.first_name}{" "}
                    {result.customerId.last_name}
                  </div>
                  <div>
                    Customer Phone:{" "}
                    {result.phone ? result.phone : "No number recorded"}
                  </div>
                </DropDown>
              </div>
              <div className="refundsearchDropdown">
                <DropDown label={"Order Info"}>
                  <div>Order ID: {result.orderId._id}</div>
                  <div>Order Date: {result.orderId.created_at}</div>
                  <div>Order Status: {result.orderId.status}</div>
                  <div>Total Amount: {result.orderId.totalAmount}</div>
                  <div>Shipping Address ID: {result.orderId.shipping}</div>
                </DropDown>
              </div>
              <div className="refundsearchDropdown">
                <DropDown label={"Items in the Refund"}>
                  {result.items.map((item) => (
                    <div key={item._id}>
                      <div>Item ID: {item.productId._id}</div>
                      <div>Item Name: {item.productId.name}</div>
                      <div>Quantity Refunded: {item.quantity}</div>
                      <div>Refund Reason: {item.reason}</div>
                    </div>
                  ))}
                </DropDown>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
export default RefundSearch;
