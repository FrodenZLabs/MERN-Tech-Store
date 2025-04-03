import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeConfig } from "flowbite-react";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminGuarantorsPage from "./pages/admin/AdminGuarantorsPage";
import AdminPaymentsPage from "./pages/admin/AdminPaymentsPage";
import AdminCreditRisksPage from "./pages/admin/AdminCreditRisks";
import AdminProfile from "./pages/admin/AdminProfile";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import LoginPage from "./pages/authentication/Login";
import RegisterPage from "./pages/authentication/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OnlyUserPrivateRoute from "./components/OnlyUserPrivateRoute";
import LandingPage from "./pages/LandingPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import CreditAssessmentPage from "./pages/users/CreditAsssessmentPage";
import UserProfilePage from "./pages/users/UserProfilePage";
import OrderSuccessPage from "./pages/product/OrderSuccessPage";
import CartPage from "./pages/product/CartPage";
import CheckoutPage from "./pages/product/CheckoutPage";
import OrderDetailsPage from "./pages/users/OrderDetailsPage";
import OrdersPage from "./pages/users/OrdersPage";
import ProductPage from "./pages/product/ProductsPage";
import ProductItemPage from "./pages/product/ProductItemsPage";
import RepaymentPlanPage from "./pages/product/RepaymentPlanPage";
import CreditPredictionPage from "./pages/users/CreditPredictionPage";
import NavbarFooter from "./layouts/NavbarFooter";

function App() {
  return (
    <BrowserRouter>
      <ThemeConfig dark={false} />
      <ToastContainer />
      <Routes>
        <Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />

          <Route element={<OnlyUserPrivateRoute />}>
            <Route element={<NavbarFooter />}>
              <Route path="/product/:id" element={<ProductItemPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/my-orders" element={<OrdersPage />} />
              <Route
                path="/my-orders/orders/:id"
                element={<OrderDetailsPage />}
              />
              <Route path="/product/checkout" element={<CheckoutPage />} />
              <Route
                path="/product/repayment-plan/:id"
                element={<RepaymentPlanPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/product/order-success"
                element={<OrderSuccessPage />}
              />
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route
                path="/credit-prediction"
                element={<CreditPredictionPage />}
              />
              <Route
                path="/credit-assessment"
                element={<CreditAssessmentPage />}
              />
            </Route>
          </Route>

          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/guarantors" element={<AdminGuarantorsPage />} />
            <Route path="/admin/payments" element={<AdminPaymentsPage />} />
            <Route
              path="/admin/credit-risks"
              element={<AdminCreditRisksPage />}
            />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
