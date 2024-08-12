import { Routes, Route } from "react-router-dom";
import ProductsList from "./components/product/ProductList";
import ProductsListE from "./components/product/ProductListE";
import CreateP from "./components/product/CreateP";
import ProductDetail from "./components/product/ProductDetail";

function ProductRoutes() {
  return (
    <Routes>
      <Route index element={<ProductsListE />} />
      <Route path="all" element={<ProductsList />} />
      <Route path="create" element={<CreateP />} />
      <Route path=":id" element={<ProductDetail />} />
    </Routes>
  );
}

export default ProductRoutes;
