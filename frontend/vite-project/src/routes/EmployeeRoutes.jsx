import { Routes, Route } from "react-router-dom";
import LoginE from "../components/employee/LoginE";
import EmployeeProtectRoute from "./EmployeeProtectRoute";
import GetEmailResetPasswordEmployee from "../components/employee/GetEmailResetPasswordEmployee";
import ResetPasswordEmployee from "../components/employee/ResetPasswordEmplyoee";

function EmployeeRoutes() {
  return (
    <main>
      <Routes>
        {/* Public login route */}
        <Route path="login" element={<LoginE />} />
        <Route
          path="forget-password"
          element={<GetEmailResetPasswordEmployee />}
        />
        <Route path="reset-password" element={<ResetPasswordEmployee />} />
        {/* Protected employee routes */}
        <Route path="/*" element={<EmployeeProtectRoute />} />
      </Routes>
    </main>
  );
}

export default EmployeeRoutes;
