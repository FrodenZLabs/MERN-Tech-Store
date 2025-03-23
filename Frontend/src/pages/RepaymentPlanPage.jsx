import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RepaymentPlanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity } = location.state || {};
  const [repaymentPlan, setRepaymentPlan] = useState(3);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Function to proceed to checkout
  const handleProceedToCheckout = () => {
    navigate(`/product/checkout/${product._id}`, {
      state: { product, quantity, repaymentPlan, deliveryAddress },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Product Details */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        Choose Repayment Plan
      </h2>
      {product ? (
        <div className="border p-4 rounded-lg mb-4 flex gap-6">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-900">
              Price: Kshs. {Number(product.base_price).toLocaleString()}
            </p>
            <p className="text-gray-900">Quantity: {quantity}</p>
          </div>
        </div>
      ) : (
        <h1 className="text-4xl text-center mt-20">Product not found!</h1>
      )}

      {/* Repayment Plan Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Repayment Plan</h3>
        <div className="flex flex-col gap-3">
          {[3, 6, 9, 12].map((months) => (
            <label
              key={months}
              className={`p-3 border rounded-lg cursor-pointer ${
                repaymentPlan === months ? "border-blue-500 bg-blue-100" : ""
              }`}
            >
              <input
                type="radio"
                name="repayment"
                value={months}
                checked={repaymentPlan === months}
                onChange={() => setRepaymentPlan(months)}
                className="mr-2"
              />
              {months} Months Plan
            </label>
          ))}
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className="w-full border p-3 rounded-lg"
          placeholder="Enter your delivery address..."
        />
      </div>

      {/* Proceed Button */}
      <button
        className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700"
        onClick={handleProceedToCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default RepaymentPlanPage;
