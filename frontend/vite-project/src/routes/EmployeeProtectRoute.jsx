import { Routes, Route } from "react-router-dom";
import CreateE from "../components/employee/CreateE";
import EmployeeList from "../components/employee/EmployeeList";
import EmployeeDetail from "../components/employee/EmployeeDetail";
import EmployeeAuthProvider from "./EmployeeAuthProvider";
import ProductsListE from "../components/employee/ProductListE";
import CreateP from "../components/employee/CreateP";
import CustomerSearch from "../components/employee/CustomerSearch";
// import CustomerDetail from "../components/customers/CustomerDetail";
import EmployeeNavBar from "../components/EmployeeNavBar";
import EmployeeDashboard from "../components/employee/EmployeeDashboard";

function EmployeeProtectRoute() {
  return (
    <EmployeeAuthProvider>
      <EmployeeNavBar />
      <Routes>
        {/* login | create */}
        <Route path="create" element={<CreateE />} />

        {/* employee list | search | details */}
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="all" element={<EmployeeList />} />
        <Route path="all/:id" element={<EmployeeDetail />} />

        {/* customers */}
        <Route path="customers" element={<CustomerSearch />} />
        {/* <Route path="customers/:id" element={<CustomerDetail />} /> */}

        {/* products */}
        <Route path="products/create" element={<CreateP />} />
        <Route path="products" element={<ProductsListE />} />
      </Routes>
    </EmployeeAuthProvider>
  );
}

export default EmployeeProtectRoute;
