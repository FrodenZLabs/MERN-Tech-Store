import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { fetchOrdersByUserID } from "../../services/orderService";
import { BsXCircle } from "react-icons/bs";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]); // State for storing orders
  const [loading, setLoading] = useState(true); // State for loading
  const { currentUser } = useSelector((state) => state.authentication); // Get current user
  const authId = currentUser?.user._id; // Extract user ID

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetchOrdersByUserID(authId);

        setOrders(response.data); // Set orders in state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authId]);

  // Truncate title after a few words (e.g., 5 words)
  const truncateTitle = (title, wordLimit = 5) => {
    const words = title?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <HashLoader color="#ffcb00" size={200} />
        </div>
      )}

      {/* No Orders */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <BsXCircle className="w-20 h-20 text-red-600 mb-4" />
          <p className="text-xl text-gray-50-600">Your orders list is empty.</p>
          <Link
            to="/products"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* List of Orders */}
      {orders.length > 0 && (
        <div>
          {orders.map((order, index) => (
            <Link
              key={index}
              to={`/my-orders/orders/${order._id}`}
              className="block border-b-2 py-4 hover:bg-blue-100 hover:border-l-4 hover:border-l-blue-500 px-10 rounded-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">Order #{order._id}</h2>
              <p className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Total Amount: Kshs. {order.totalAmount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Payment Status: {order.paymentStatus}
              </p>

              {/* Order Items */}
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul>
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between mb-2"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.productId.images[0]} // Use product image URL
                          alt={item.productId.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="ml-4">
                          <p className="font-medium">
                            {truncateTitle(item.productId.title)}
                          </p>
                          <p className="text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 font-semibold">
                        Kshs.{" "}
                        {item.total_price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
