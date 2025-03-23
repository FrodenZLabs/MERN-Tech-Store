import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/authentication/SignUp";
import SignIn from "./pages/authentication/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/dashboard/Dashboard";
import CreditAssessmentPage from "./pages/CreditAssessmentPage";
import CreditPredictionPage from "./pages/CreditPredictionPage";
import LandingPage from "./pages/LandingPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import DashboardLayout from "./components/DashboardLayout";
import ProductItemPage from "./pages/ProductItemPage";
import ProductPage from "./pages/ProductPage";
import RepaymentPlanPage from "./pages/RepaymentPlanPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductItemPage />} />
          <Route
            path="/product/repayment-plan/:id"
            element={<RepaymentPlanPage />}
          />
          <Route path="/product/payment/:id" element={<PaymentPage />} />
          <Route path="/product/checkout/:id" element={<CheckoutPage />} />
          <Route path="/product/order-success" element={<OrderSuccessPage />} />
          <Route path="/credit-prediction" element={<CreditPredictionPage />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/credit-assessment" element={<CreditAssessmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
