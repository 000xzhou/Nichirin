import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footing from "./components/Footing";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";
import EmployeeRoutes from "./EmployeeRoutes";
import CustomerRoutes from "./CustomerRoutes";
import ProductRoutes from "./ProductRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar userRole="employee" user={{ role: "admin" }} />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/employee/*" element={<EmployeeRoutes />} />
            <Route path="/customers/*" element={<CustomerRoutes />} />
            <Route path="/products/*" element={<ProductRoutes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footing />
      </BrowserRouter>
    </div>
  );
}

export default App;
