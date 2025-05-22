import { Routes, Route } from "react-router-dom";
import LoginC from "../components/customers/LoginC";
import Register from "../components/customers/Register";
import NavBar from "../components/NavBar";
import Footing from "../components/Footing";
import ProductsList from "../components/product/ProductList";
import ProductDetail from "../components/product/ProductDetail";
import Landing from "../components/Landing";
import CustomerProtectRoute from "./CustomerProtectRoute";
import Checkout from "../components/product/Checkout";
import CustomerAuthProvider from "./CustomerAuthProvider";
import { CartProvider } from "./CartProvider";
import Cart from "../components/product/Cart";
import About from "../components/help/About";
import ContactUs from "../components/help/ContactUs";
import Faq from "../components/help/Faq";
import Careers from "../components/help/Careers";
import Terms from "../components/help/Terms";
import RefundPolicy from "../components/help/RefundPolicy";
import ReviewForm from "../components/product/reviews/ReviewForm";
import AllReviews from "../components/product/reviews/AllReviews";
import CheckEmail from "../components/customers/CheckEmail";
import ResetPassword from "../components/customers/ResetPassword";
import GetEmailResetPassword from "../components/customers/GetEmailResetPassword";
// import { useCustomerAuth } from "./CustomerAuthProvider";

function CustomerRoutes() {
  // const [isUser, setIsUser] = useState(null);
  // console.log("Current isUser state:", isUser);
  // const handleSetIsUser = (value) => {
  //   setIsUser(value);
  // };

  return (
    <>
      <CustomerAuthProvider>
        <CartProvider>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              {/* login and register  */}
              <Route path="login" element={<LoginC />} />
              <Route path="register" element={<Register />} />
              <Route path="get-email" element={<GetEmailResetPassword />} />
              <Route path="check-email" element={<CheckEmail />} />
              <Route path="reset-password" element={<ResetPassword />} />
              {/* customers details */}
              <Route path="customers/*" element={<CustomerProtectRoute />} />

              {/* products */}
              <Route path="products" element={<ProductsList />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="products/:id/reviews/add" element={<ReviewForm />} />
              <Route path="products/:id/reviews/all" element={<AllReviews />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              {/* footing routes */}
              <Route path="about-us" element={<About />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="faq" element={<Faq />} />
              <Route path="careers" element={<Careers />} />
              <Route path="terms" element={<Terms />} />
              <Route path="return-policy" element={<RefundPolicy />} />
            </Routes>
          </main>
          <Footing />
        </CartProvider>
      </CustomerAuthProvider>
    </>
  );
}

export default CustomerRoutes;
