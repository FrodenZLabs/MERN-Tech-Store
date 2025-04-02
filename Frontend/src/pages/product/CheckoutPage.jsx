import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearCart, fetchUserCart } from "../../services/cartService";
import { createPayments } from "../../services/paymentService";
import { fetchDynamicPrice } from "../../services/userService";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [loading, setLoading] = useState(false); // State for loading
  const [subtotal, setSubtotal] = useState(0); // State for subtotal
  // eslint-disable-next-line no-unused-vars
  const [shippingCost, setShippingCost] = useState(250); // Fixed shipping cost
  const [total, setTotal] = useState(0); // State for total
  const { currentUser } = useSelector((state) => state.authentication);
  const userId = currentUser?.user._id;
  const [dynamicPrices, setDynamicPrices] = useState({});
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);

  // Fetch cart items and calculate dynamic prices
  useEffect(() => {
    const fetchCartItemsAndPrices = async () => {
      try {
        setLoading(true);

        // Step 1: Fetch cart items for the user
        const response = await fetchUserCart(userId);
        const items = response.cart.items;

        if (!items || items.length === 0) {
          toast.error("Your cart is empty.");
          setLoading(false);
          return;
        }

        // Step 2: Fetch dynamic prices for each product based on repayment plan
        const pricePromises = items.map((item) =>
          fetchDynamicPrice(item.productId._id, item.repaymentPlan)
        );
        const priceResults = await Promise.all(pricePromises);

        // Step 3: Store dynamic prices and calculate totals
        const prices = {};
        let calculatedSubtotal = 0;
        let totalMonthlyRepayment = 0;

        priceResults.forEach((result, index) => {
          const product = items[index];
          if (result.success && result.dynamicPrice) {
            // Store dynamic price and monthly repayment for each product
            prices[product.productId._id] = {
              dynamic_price: result.dynamicPrice.dynamic_price,
              monthly_repayment: result.dynamicPrice.monthly_repayment,
            };

            // Calculate subtotal using dynamic price or fallback to base price
            const price =
              result.dynamicPrice.dynamic_price || product.productId.base_price;
            calculatedSubtotal += price * product.quantity;

            // Calculate monthly repayment
            const monthlyRepayment =
              result.dynamicPrice.monthly_repayment ||
              price / (product.repaymentPlan || 1);
            totalMonthlyRepayment += monthlyRepayment * product.quantity;
          }
        });

        // Update state with fetched data
        setCartItems(items);
        setDynamicPrices(prices);
        setSubtotal(calculatedSubtotal);
        setTotal(calculatedSubtotal + shippingCost);
        setMonthlyInstallment(totalMonthlyRepayment);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items or dynamic prices:", error);
        toast.error("Failed to load cart items or dynamic prices.");
        setLoading(false);
      }
    };

    fetchCartItemsAndPrices();
  }, [userId]);

  // Truncate title after a few words (e.g., 5 words)
  const truncateTitle = (title, wordLimit = 5) => {
    const words = title?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-2 gap-8 py-10 px-6 bg-white shadow-lg rounded-lg my-5">
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <HashLoader color="#ffcb00" size={200} />
        </div>
      )}

      <div className="w-full space-y-6">
        <div>
          <h1 className="font-semibold mb-4 text-3xl">Delivery</h1>
          <div className="flex gap-x-5 mb-4 w-full">
            <div className="w-1/2">
              <TextInput
                id="firstName"
                name="firstName"
                required
                placeholder="First Name"
                type="text"
              />
            </div>
            <div className="w-1/2">
              <TextInput
                id="lastName"
                name="lastName"
                required
                placeholder="Last Name"
                type="text"
              />
            </div>
          </div>

          <div className="mb-4">
            <TextInput
              id="address"
              name="address"
              required
              placeholder="Address"
              type="text"
            />
          </div>

          <div className="flex gap-x-5">
            <div className="w-1/2">
              <TextInput
                id="city"
                name="city"
                required
                placeholder="City"
                type="text"
              />
            </div>
            <div className="w-1/2">
              <TextInput
                id="postalCode"
                name="postalCode"
                required
                placeholder="Postal Code"
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <Elements stripe={stripePromise}>
          <CheckoutForm
            cartItems={cartItems}
            monthlyInstallment={monthlyInstallment}
            dynamicPrices={dynamicPrices}
            total={total}
            userId={userId}
          />
        </Elements>
      </div>

      <div className="w-full bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center border-b mb-2 py-2 w-full"
              >
                {/* Image */}
                <div className="w-[20%] flex justify-center">
                  <img
                    src={item.productId.images[0]}
                    alt={item.productId.name}
                    className="w-12 h-12 object-cover"
                  />
                </div>
                {/* Name and Price */}
                <div className="w-[50%] flex flex-col text-left px-2">
                  <h3 className="font-semibold">
                    {truncateTitle(item.productId.title)}
                  </h3>
                  <p className="text-gray-500">{item.productId.category}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>

                <div className="w-[30%]">
                  <p className="text-base font-semibold">
                    Kshs.{" "}
                    {dynamicPrices[
                      item.productId._id
                    ]?.dynamic_price?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  {dynamicPrices[item.productId._id] && (
                    <p className="text-xs text-gray-500 line-through">
                      Kshs. {item.productId.base_price.toLocaleString("en-US")}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-y-1 mt-4">
              <div className="flex justify-between">
                <p>Monthly Installment</p>
                <p>
                  Kshs.{" "}
                  {monthlyInstallment.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p>SubTotal</p>
                <p>
                  Kshs.{" "}
                  {subtotal.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>
                  Kshs.{" "}
                  {shippingCost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-lg">Total</p>
                <p className="font-semibold text-lg">
                  Kshs.{" "}
                  {total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    </div>
  );
};

const CheckoutForm = ({
  cartItems,
  monthlyInstallment,
  dynamicPrices,
  total,
  userId,
}) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded.");
      return;
    }

    setLoading(true);

    try {
      // Prepare the payment data
      const paymentPayload = {
        items: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: dynamicPrices[item.productId._id]?.dynamic_price,
          repayment_plan: item.repaymentPlan || 3, // Default to 3 months if not set
        })),
        monthlyInstallment,
        total_price: total,
      };

      console.log("Payment Payload:", paymentPayload); // Log payload for debugging
      // Step 1: Create a payment intent on the backend
      const response = await createPayments(paymentPayload); // Use the createPayment service
      const clientSecret = response?.clientSecret;

      // Step 2: Confirm the payment with Stripe
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
        await clearCart(userId);
        setTimeout(() => {
          navigate("/product/order-success");
        }, 2000);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error during payment:", err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-semibold mb-4 text-3xl">Payment</h1>

      <div className="mb-4">
        <label className="block text-gray-600 font-medium">
          Cardholder Name
        </label>
        <TextInput
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="w-full mt-1 uppercase"
          placeholder="John Doe"
          required
        />
      </div>

      {/* Card Element */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Card Details</label>
        <div className="p-3 border border-gray-500 rounded-lg mt-2">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-green-600 text-white enabled:hover:bg-green-400"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default CheckoutPage;
