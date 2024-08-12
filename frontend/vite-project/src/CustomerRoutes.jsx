import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/customers/Register";
import CustomerList from "./components/customers/CustomerList";
import CustomerDetail from "./components/customers/CustomerDetail";

function CustomerRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route index element={<CustomerList />} />
      <Route path=":username" element={<CustomerDetail />} />
    </Routes>
  );
}

export default CustomerRoutes;
