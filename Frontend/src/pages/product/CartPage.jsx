import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HashLoader, RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BsXCircle } from "react-icons/bs";
import { fetchUserCart, removeItemFromCart } from "../../services/cartService";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [loading, setLoading] = useState(false); // State for loading
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const { currentUser } = useSelector((state) => state.authentication);
  const authId = currentUser?.user._id;

  const fetchCart = async (authId) => {
    try {
      setLoading(true);

      const response = await fetchUserCart(authId);
      if (!response.cart) {
        throw new Error("Failed to fetch cart data.");
      }

      // Update cart items and calculate total price
      setCartItems(response.cart.items);
      const calculatedTotal = response.cart.items.reduce(
        (sum, item) => sum + item.productId.base_price * item.quantity,
        0
      );
      setTotalPrice(calculatedTotal);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart items.");
      setLoading(false);
    }
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = async (productId) => {
    try {
      setLoading(true);

      // Call the backend API to remove the item
      const response = await removeItemFromCart({ productId });
      if (!response.success) {
        throw new Error(response.message || "Failed to remove item from cart.");
      }

      // Update the cart items state by filtering out the removed item
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );

      await fetchCart(authId);
      toast.success("Item removed from cart");

      setLoading(false);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error(error.message || "Failed to remove item from cart.");
      setLoading(false);
    }
  };

  // Fetch cart items from the server
  useEffect(() => {
    fetchCart(authId);
  }, [authId]);

  // Truncate title after a few words (e.g., 5 words)
  const truncateTitle = (title, wordLimit = 5) => {
    const words = title?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 my-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
          <HashLoader color="#ffcb00" size={200} />
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <BsXCircle className="w-20 h-20 text-red-600 mb-4" />
          <p className="text-xl text-gray-50-600">Your cart is empty.</p>
          <Link
            to="/products"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* List of Items */}
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              {/* Image */}
              <div className="w-1/4 flex justify-center">
                <img
                  src={item.productId.images[0]} // Display the first image
                  alt={item.productId.title}
                  className="w-20 h-20 object-cover rounded"
                />
              </div>

              {/* Product Details */}
              <div className="w-1/2 flex flex-col justify-center">
                <h3 className="font-semibold">
                  {truncateTitle(item.productId.title)}
                </h3>
                <p className="text-gray-500">
                  Kshs. {item.productId.base_price}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>

              {/* Actions */}
              <div className="w-1/4 flex flex-col items-center">
                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <RiDeleteBack2Line className="text-3xl" />
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="mt-6 flex justify-end">
            <p className="text-lg font-bold">
              Total: Kshs. {totalPrice.toFixed(2)}
            </p>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 flex justify-end">
            <Link to="/product/checkout">
              <Button className="bg-blue-500 text-white px-6 py-2 rounded-md enabled:hover:bg-blue-400 transition">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
