import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Footing from "./components/Footing";
// import Landing from "./components/Landing";
import NotFound from "./components/NotFound";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
// import ProductRoutes from "./routes/ProductRoutes";
// import Cart from "./components/product/Cart";
// import LoginC from "../components/customers/LoginC";
// import Register from "../components/customers/Register";
// import LoginE from "../components/employee/LoginE";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/employee/*" element={<EmployeeRoutes />} />
          <Route path="/*" element={<CustomerRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
