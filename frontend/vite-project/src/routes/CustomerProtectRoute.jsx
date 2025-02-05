import { Routes, Route } from "react-router-dom";
import CustomerDetail from "../components/customers/CustomerDetail";
import EditCustomerForm from "../components/customers/EditCustomerForm";
import EditCustomer2 from "../components/customers/EditCustomer2";
import EditCustomerPasswordForm from "../components/customers/EditCustomerPasswordForm";
import EditAddress from "../components/customers/EditAddress";
import AddressList from "../components/customers/AddressList";

function CustomerProtectRoute() {
  return (
    <Routes>
      <Route path=":id" element={<CustomerDetail />} />
      <Route path="edit-info">
        <Route index element={<EditCustomer2 />} />
        <Route path="email" element={<EditCustomerForm />} />
        <Route path="fname" element={<EditCustomerForm />} />
        <Route path="lname" element={<EditCustomerForm />} />
        <Route path="password" element={<EditCustomerPasswordForm />} />
      </Route>
      {/* do I really need 2 seperate ones? we will see later */}
      {/* <Route path="edit-address" element={<EditAddress />} /> */}
      {/* <Route path="edit-shipping  " element={<EditAddress />} /> */}
      <Route path="/edit-address" element={<AddressList />} />
      <Route path="/add-address" element={<EditAddress type="billing" />} />
      <Route path="/add-shipping" element={<EditAddress type="shipping" />} />
    </Routes>
  );
}

export default CustomerProtectRoute;
