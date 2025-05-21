import { Link } from "react-router-dom";
import { useState } from "react";
import ApiService from "../../../api/api";
import DropDown from "../../Dropdown";

function RefundSearch({ itemId, image, name, quantity, price }) {
  const formatPrice = (price) =>
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const [searchType, setSearchType] = useState("refundId");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState();

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
      const api = new ApiService("http://localhost:3000");

      const params = new URLSearchParams({
        searchType,
        searchValue,
      });
      const data = await api.get(`/refund/findByQuery?${params.toString()}`);

      console.log("Hereeee", data[0].items);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Search</button>
      </form>
      {searchResult && searchResult.length > 0 && (
        <section>
          {searchResult.map((result) => (
            <div key={result._id}>
              <div>
                <DropDown label={"Refund Info"}>
                  <div>Refund ID: {result._id}</div>
                  <div>Status: {result.status}</div>
                  <div>Requested At date: {result.requestedAt}</div>
                  <div>
                    Processed At date:{" "}
                    {result.reviewedAt ? result.reviewedAt : "Pending"}
                  </div>
                  <div>
                    Processed By:{" "}
                    {result.processedBy ? result.processedBy : "Pending"}
                  </div>
                  <div>Refund Amount: {result.status}</div>
                  <div>Note: {result.note}</div>
                </DropDown>
              </div>
              <div>
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
              <div>
                <DropDown label={"Order Info"}>
                  <div>Order ID: {result.orderId._id}</div>
                  <div>Order Date: {result.orderId.created_at}</div>
                  <div>Order Status: {result.orderId.status}</div>
                  <div>Total Amount: {result.orderId.totalAmount}</div>
                  <div>Shipping Address ID: {result.orderId.shipping}</div>
                </DropDown>
              </div>
              <div>
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
