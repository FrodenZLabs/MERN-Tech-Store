import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const [product, setProduct] = useState();
  const [repaymentPlan, setRepaymentPlan] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[75vh]">
      <div className="max-w-2xl mx-auto text-center bg-white p-10 shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase! Your order has been received.
        </p>

        {/* Order Details */}
        {product && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="flex items-center justify-center mt-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
            <p className="mt-2 text-lg font-semibold">{product.name}</p>
            <p className="text-gray-700">
              Price: Kshs. {Number(product.base_price).toLocaleString()}
            </p>
            <p className="text-gray-700">
              Repayment Plan: {repaymentPlan} months
            </p>
            <p className="text-gray-700">Delivery Address: {deliveryAddress}</p>
          </div>
        )}

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-[#008800] text-white py-3 px-6 rounded-lg hover:bg-[#254227] font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
