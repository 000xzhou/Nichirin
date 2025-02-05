import { Routes, Route } from "react-router-dom";
import CustomerDetail from "../components/customers/CustomerDetail";
import EditCustomerForm from "../components/customers/EditCustomerForm";
import EditCustomer2 from "../components/customers/EditCustomer2";
import EditCustomerPasswordForm from "../components/customers/EditCustomerPasswordForm";
import EditAddressForm from "../components/customers/EditAddressForm";
import AddAddressForm from "../components/customers/AddAddressForm";
import AddressList from "../components/customers/AddressList";

function CustomerProtectRoute() {
  return (
    <Routes>
      <Route path=":id" element={<CustomerDetail />} />
      <Route path="login-security">
        <Route index element={<EditCustomer2 />} />
        <Route path="email" element={<EditCustomerForm />} />
        <Route path="fname" element={<EditCustomerForm />} />
        <Route path="lname" element={<EditCustomerForm />} />
        <Route path="password" element={<EditCustomerPasswordForm />} />
      </Route>
      {/* do I really need 2 seperate ones? we will see later */}
      {/* <Route path="edit-address" element={<EditAddress />} /> */}
      {/* <Route path="edit-shipping  " element={<EditAddress />} /> */}
      <Route path="addresses">
        <Route index element={<AddressList />} />
        <Route path="add" element={<AddAddressForm />} />
        <Route path="edit/:addressId" element={<EditAddressForm />} />
      </Route>
      {/* <Route path="/add-shipping" element={<EditAddress type="shipping" />} /> */}
    </Routes>
  );
}

export default CustomerProtectRoute;
