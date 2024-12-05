import { Routes, Route } from "react-router-dom";
import CustomerDetail from "../components/customers/CustomerDetail";
import CustomerAuthProvider from "./CustomerAuthProvider";
// import LoginC from "../components/customers/LoginC";
// import Register from "../components/customers/Register";
// import Test from "./Test";

function CustomerProtectRoute() {
  return (
    // <CustomerAuthProvider>
    <Routes>
      {/* <Route path="test" element={<Test />} /> */}
      <Route path=":id" element={<CustomerDetail />} />
    </Routes>
    // </CustomerAuthProvider>
  );
}

export default CustomerProtectRoute;
