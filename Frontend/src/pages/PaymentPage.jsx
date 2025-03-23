import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import VisaLogo from "../assets/VisaLogo.png";
import { FcSimCardChip } from "react-icons/fc";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { createPayments } from "../redux/services/authService";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.authentication);
  const userId = currentUser?.user._id;
  const [name, setName] = useState("");
  const { product, quantity, repaymentPlan, monthlyInstallment } =
    location.state || {};

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded.");
      return;
    }

    setLoading(true);

    try {
      const paymentPayload = {
        user_id: userId,
        product_id: product._id, // Assuming product ID is stored in product object
        payment_amount: monthlyInstallment, // The amount to be paid
      };
      const data = await createPayments(paymentPayload);
      const clientSecret = data?.clientSecret;

      if (!clientSecret) {
        throw new Error(
          "Payment initiation failed. No client secret returned."
        );
      }

      const cardElement = elements.getElement(CardElement);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name,
          },
        },
      });

      if (payload.error) {
        toast.error(payload.error.message);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Payment successful!");
        setTimeout(() => {
          navigate("/product/order-success");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white max-w-xl mx-auto rounded-lg shadow-lg">
        <form className="py-15 px-8 mt-10" onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">
              Cardholder Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="w-full mt-1 px-3 border rounded-lg uppercase"
              placeholder="John Doe"
              required
            />
          </div>

          <label className="block text-gray-600 font-medium">
            Card Details
          </label>
          <div className="p-3 border rounded-lg mt-2">
            <CardElement options={{ hidePostalCode: true }} />
          </div>

          <div className="">
            <label className="block text-gray-600 font-medium">
              Amount (Kshs.)
            </label>
            <input
              type="text"
              name="monthlyInstallment"
              value={monthlyInstallment}
              className="w-full mt-1 px-3 border rounded-lg text-gray-500"
              readOnly
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-3 rounded-lg mt-6 hover:bg-green-800 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Processing..." : "Make Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
