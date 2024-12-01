import { Routes, Route } from "react-router-dom";
import LoginC from "../components/customers/LoginC";
import Register from "../components/customers/Register";
import NavBar from "../components/NavBar";
import Footing from "../components/Footing";
import ProductsList from "../components/product/ProductList";
import ProductDetail from "../components/product/ProductDetail";
import Landing from "../components/Landing";
import CustomerProtectRoute from "./CustomerProtectRoute";
import Checkout from "../components/product/Checkout";
// import CustomerAuthProvider from "./CustomerAuthProvider";
// import { useCustomerAuth } from "./CustomerAuthProvider";
import { useState } from "react";

function CustomerRoutes() {
  const [isUser, setIsUser] = useState(null);
  console.log("Current isUser state:", isUser);
  const handleSetIsUser = (value) => {
    setIsUser(value);
  };

  return (
    <>
      <NavBar isUser={isUser} setIsUser={setIsUser} />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* login and register  */}
          <Route path="login" element={<LoginC setIsUser={setIsUser} />} />
          <Route path="register" element={<Register setIsUser={setIsUser} />} />
          {/* customers details */}
          <Route path="customers/*" element={<CustomerProtectRoute />} />

          {/* products */}
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footing />
    </>
  );
}

export default CustomerRoutes;