import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateE from "./components/employee/CreateE";
import EmployeeList from "./components/employee/EmployeeList";
import EmployeeDetail from "./components/employee/EmployeeDetail";

function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="create" element={<CreateE />} />
      <Route index element={<EmployeeList />} />
      <Route path=":handle" element={<EmployeeDetail />} />
    </Routes>
  );
}

export default EmployeeRoutes;
