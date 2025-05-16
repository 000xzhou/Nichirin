import { Routes, Route } from "react-router-dom";
import CustomerDetail from "../components/customers/CustomerDetail";
import EditCustomerForm from "../components/customers/EditCustomerForm";
import EditCustomer2 from "../components/customers/EditCustomer2";
import EditCustomerPasswordForm from "../components/customers/EditCustomerPasswordForm";
import EditAddressForm from "../components/customers/EditAddressForm";
import AddAddressForm from "../components/customers/AddAddressForm";
import AddressList from "../components/customers/AddressList";
import EditAddress from "../components/customers/EditAddress";
import OrderConfirmation from "../components/customers/orders/OrderConfirmation";
import OrderList from "../components/customers/orders/OrderList";

function CustomerProtectRoute() {
  return (
    <Routes>
      <Route path="user/:id" element={<CustomerDetail />} />
      <Route path="login-security">
        <Route index element={<EditCustomer2 />} />
        <Route path="email" element={<EditCustomerForm />} />
        <Route path="fname" element={<EditCustomerForm />} />
        <Route path="lname" element={<EditCustomerForm />} />
        <Route path="password" element={<EditCustomerPasswordForm />} />
      </Route>

      <Route path="addresses">
        <Route index element={<AddressList />} />
        <Route path="add" element={<AddAddressForm />} />
        <Route path="edit/:addressId" element={<EditAddress />} />
      </Route>

      <Route path="orders">
        <Route index element={<OrderList />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
      </Route>
      {/* <Route path="/add-shipping" element={<EditAddress type="shipping" />} /> */}
    </Routes>
  );
}

export default CustomerProtectRoute;
