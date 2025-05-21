import { Routes, Route } from "react-router-dom";
import CreateE from "../components/employee/CreateE";
import EmployeeList from "../components/employee/EmployeeList";
import EmployeeDetail from "../components/employee/EmployeeDetail";
import EmployeeAuthProvider from "./EmployeeAuthProvider";
import ProductsListE from "../components/employee/product/ProductListE";
import CreateP from "../components/employee/product/CreateP";
import CustomerSearch from "../components/employee/customers/CustomerSearch";
// import CustomerDetail from "../components/customers/CustomerDetail";
import EmployeeNavBar from "../components/EmployeeNavBar";
import EmployeeDashboard from "../components/employee/EmployeeDashboard";
import EmployeeProductDetail from "../components/employee/product/EmployeeProductDetail";
import EditEmployee from "../components/employee/EditEmployee";
import EditCustomer from "../components/employee/customers/EditCustomer";
import EmployeeCustomerDetails from "../components/employee/customers/EmployeeCustomerDetails";
import Refund from "../components/employee/customers/Refund";
import RefundSearch from "../components/customers/orders/RefundSearch";

function EmployeeProtectRoute() {
  return (
    <EmployeeAuthProvider>
      <EmployeeNavBar />
      <div className="employee-main-content">
        <Routes>
          {/* login | create */}
          <Route path="create" element={<CreateE />} />

          {/* employee list | search | details | profile*/}
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="all" element={<EmployeeList />} />
          <Route path="profile/:id" element={<EmployeeDetail />} />
          <Route path="profile/:id/edit" element={<EditEmployee />} />
          {/* <Route path="all/:id" element={<EmployeeDetail />} /> */}

          {/* customers */}
          <Route path="customers" element={<CustomerSearch />} />
          <Route path="customers/:id" element={<EmployeeCustomerDetails />} />
          <Route path="customers/:id/edit" element={<EditCustomer />} />
          <Route path="refund/:orderid" element={<Refund />} />
          <Route path="search/refund" element={<RefundSearch />} />
          {/* <Route path="customers/:id" element={<CustomerDetail />} /> */}

          {/* products */}
          <Route path="products/create" element={<CreateP />} />
          <Route path="products" element={<ProductsListE />} />
          <Route path="products/:id" element={<EmployeeProductDetail />} />
        </Routes>
      </div>
    </EmployeeAuthProvider>
  );
}

export default EmployeeProtectRoute;
