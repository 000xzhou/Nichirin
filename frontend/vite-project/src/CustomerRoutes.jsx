import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/customers/Register";
import CustomerSearch from "./components/customers/CustomerSearch";
import CustomerDetail from "./components/customers/CustomerDetail";

function CustomerRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route index element={<CustomerSearch />} />
      <Route path=":username" element={<CustomerDetail />} />
    </Routes>
  );
}

export default CustomerRoutes;
