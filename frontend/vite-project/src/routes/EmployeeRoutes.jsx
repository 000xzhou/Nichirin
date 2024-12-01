import { Routes, Route } from "react-router-dom";
import LoginE from "../components/employee/LoginE";
import EmployeeProtectRoute from "./EmployeeProtectRoute";

function EmployeeRoutes() {
  return (
    <>
      <main>
        <Routes>
          {/* Public login route */}
          <Route path="login" element={<LoginE />} />
          {/* Protected employee routes */}
          <Route path="/*" element={<EmployeeProtectRoute />} />
        </Routes>
      </main>
    </>
  );
}

export default EmployeeRoutes;
