import { Routes, Route } from "react-router-dom";
import CustomerDetail from "../components/customers/CustomerDetail";
import EditCustomer from "../components/customers/EditCustomer";
import EditAddress from "../components/customers/EditAddress";

function CustomerProtectRoute() {
  return (
    <Routes>
      <Route path=":id" element={<CustomerDetail />} />
      <Route path="edit-info" element={<EditCustomer />} />
      {/* do I really need 2 seperate ones? we will see later */}
      <Route path="edit-address" element={<EditAddress />} />
      <Route path="edit-shipping  " element={<EditAddress />} />
    </Routes>
  );
}

export default CustomerProtectRoute;
