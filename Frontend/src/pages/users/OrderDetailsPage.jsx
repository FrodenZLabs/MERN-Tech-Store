import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Button } from "flowbite-react";
import { fetchOrdersByID } from "../../services/orderService";

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null); // State for storing order details
  const [loading, setLoading] = useState(true); // State for loading
  const { id } = useParams(); // Extract order ID from URL parameters

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetchOrdersByID(id);

        setOrder(response.order); // Set order details in state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <HashLoader color="#ffcb00" size={200} />
        </div>
      )}

      {/* No Order Found */}
      {!order && <p className="text-center text-gray-500">Order not found.</p>}

      {/* Display Order Details */}
      {order && (
        <div>
          {/* Order Summary */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Order #{order._id}</h2>
            <p className="text-sm text-gray-500">
              Placed on:{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-500">
              Total Amount: Kshs.{" "}
              {order.totalAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-sm text-gray-500">
              Payment Status: {order.paymentStatus}
            </p>
            <p className="text-sm text-gray-500">
              Remaining Balance: Kshs.{" "}
              {order.remainingBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-sm text-gray-500">
              Order Status: {order.status}
            </p>
          </div>

          {/* User Details */}
          <div className="border-b pb-4 mb-6">
            <h3 className="font-semibold mb-2">User Information</h3>
            <p>Name: {order.authId?.username || "N/A"}</p>
            <p>Email: {order.authId?.email || "N/A"}</p>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-2">Items Ordered</h3>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx} className="flex items-center w-full mb-4">
                  <div className="flex items-center w-3/4">
                    <img
                      src={item.productId.images[0]} // Use product image URL
                      alt={item.productId.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="ml-8">
                      <p className="font-medium">{item.productId.title}</p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-gray-500">
                        Repayment Plan: {item.repayment_plan} months
                      </p>
                      <p className="text-gray-500">
                        Monthly Installment: Kshs.{" "}
                        {item.monthly_installment.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/4 text-right">
                    <p className="text-gray-700 font-semibold">
                      Total: Kshs.{" "}
                      {item.total_price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-gray-700 font-semibold">
                      Remaining: Kshs.{" "}
                      {item.remaining_balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Link to={"/my-orders"}>
        <Button className="mt-6 w-full">Go Back</Button>
      </Link>
    </div>
  );
};

export default OrderDetailsPage;
