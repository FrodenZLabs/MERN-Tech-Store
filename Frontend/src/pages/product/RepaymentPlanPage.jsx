import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchUserCartByProductID,
  updateToCart,
} from "../../services/cartService";
import { HashLoader } from "react-spinners";
import { BsXCircle } from "react-icons/bs";

const RepaymentPlanPage = () => {
  const navigate = useNavigate();
  const [repaymentPlan, setRepaymentPlan] = useState({});
  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // Function to update repayment plan for a specific product
  const handleRepaymentPlanChange = (productId, months) => {
    setRepaymentPlan((prevPlans) => ({
      ...prevPlans,
      [productId]: months,
    }));
  };

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await fetchUserCartByProductID(id);
        const item = response.cartItem;
        // Initialize repayment plan for the product
        setRepaymentPlan((prevPlans) => ({
          ...prevPlans,
          [item.productId._id]: item.repaymentPlan, // Default repayment plan
        }));

        setCartItem(item);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Function to proceed to checkout
  const handleProceedToCheckout = async () => {
    try {
      setLoading(true);

      const productId = cartItem.productId._id;
      const selectedRepaymentPlan = repaymentPlan[productId];

      // Call the API to update the repayment plan for each item
      await updateToCart(productId, cartItem.quantity, selectedRepaymentPlan);

      // Navigate to the checkout page with the updated repayment plans
      navigate("/product/checkout");
    } catch (error) {
      console.error("Error updating repayment plans:", error);
    } finally {
      setLoading(false);
    }
  };

  // Truncate title after a few words (e.g., 5 words)
  const truncateTitle = (title, wordLimit = 7) => {
    const words = title?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <HashLoader color="#ffcb00" size={200} />
        </div>
      )}

      {/* Product Details */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        Choose Repayment Plan
      </h2>
      {cartItem ? (
        <div className="flex flex-col items-center border-b my-2 py-2 w-full">
          {/* Image */}
          <div className="flex w-full items-center">
            <div className="w-1/4 flex justify-center">
              <img
                src={cartItem?.productId?.images[0]} // Use the product image URL
                alt={cartItem?.productId?.title}
                className="w-12 h-12 object-cover"
              />
            </div>
            {/* Name and Price */}
            <div className="w-1/2 flex flex-col text-left">
              <h3 className="font-semibold">
                {truncateTitle(cartItem?.productId?.title)}
              </h3>
              <p className="text-gray-500">{cartItem?.productId?.category}</p>
              <p className="text-gray-500">Quantity: {cartItem?.quantity}</p>
            </div>

            <div className="w-1/4">
              <p className="font-semibold">
                Kshs.{" "}
                {(
                  cartItem?.productId?.base_price * cartItem?.quantity
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Repayment Plan Selection for Each Product */}
          <div className="flex flex-col gap-2 ml-4 items-center">
            <h1 className="text-lg font-semibold">Repayment Plan</h1>
            <div className="flex gap-x-4">
              {[3, 6, 9, 12].map((months) => (
                <label
                  key={months}
                  className={`p-2 border rounded-lg cursor-pointer ${
                    repaymentPlan[cartItem?.productId?._id] === months
                      ? "border-blue-500 bg-blue-100"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`repayment-${cartItem?.productId?._id}`}
                    value={months}
                    checked={repaymentPlan[cartItem?.productId?._id] === months}
                    onChange={() =>
                      handleRepaymentPlanChange(
                        cartItem?.productId?._id,
                        months
                      )
                    }
                    className="mr-2"
                  />
                  {months} Months
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <BsXCircle className="w-20 h-20 text-red-600 mb-4" />
          <p className="text-xl text-gray-50-600">Product not found.</p>
          <Link
            to="/products"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      )}

      {/* Proceed Button */}
      <button
        className="bg-blue-600 text-white w-full py-3 my-4 rounded-lg hover:bg-blue-700"
        onClick={handleProceedToCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default RepaymentPlanPage;
