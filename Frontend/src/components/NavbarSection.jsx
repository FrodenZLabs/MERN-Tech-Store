import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  Dropdown,
  Navbar,
  Avatar,
  Button,
  NavbarBrand,
  DropdownItem,
  DropdownDivider,
  DropdownHeader,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { LuLogOut, LuPackage, LuUser } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import {
  clearAuthentication,
  signoutSuccess,
} from "../redux/reducers/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { fetchUserCart, removeItemFromCart } from "../services/cartService";
import { RiDeleteBack2Line } from "react-icons/ri";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { fetchClientByAuthID } from "../services/userService";

const NavbarSection = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]); // State for cart items
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false); // State for loading
  const authId = currentUser?.user._id;

  const handleSignout = async () => {
    try {
      const data = await logoutUser();
      toast.success(data.message);
      dispatch(signoutSuccess());
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while trying to log out");
    }
  };

  const fetchCart = async (authId) => {
    try {
      setLoading(true);

      const response = await fetchUserCart(authId);
      if (!response.cart) {
        throw new Error("Failed to fetch cart data.");
      }

      setCartItems(response.cart.items);
      setLoading(false);
    } catch (err) {
      console.error(err);

      // Check the error message before dispatching clearAuthentication
      if (
        err === "Your session has expired. Please login again." ||
        err === "You are not logged in. Please login or register." ||
        err === "Invalid token. Please login again."
      ) {
        dispatch(clearAuthentication());
      }
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

  // Fetch cart data from the server
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCart(authId);
    }, 5000); // Fetch notifications every 5 seconds

    // Initial fetch on component mount
    fetchCart(authId);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [authId]);

  return (
    <Navbar fluid className="border-b border-gray-300">
      <div className="w-full lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center px-[10vh]">
            <NavbarBrand href="/">
              <span className="self-center whitespace-nowrap text-2xl font-semibold italic">
                Techies<span className="text-red-500 italic">Store.</span>
              </span>
            </NavbarBrand>
          </div>
          <div className="flex items-center lg:gap-3">
            <div>
              <CartDropdown
                cartItems={cartItems}
                handleRemoveItem={handleRemoveItem}
              />
            </div>
            <div>
              <UserDropdown
                handleSignout={handleSignout}
                authId={authId}
                currentUser={currentUser}
              />
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

const CartDropdown = ({ cartItems, handleRemoveItem }) => {
  // Truncate title after a few words (e.g., 5 words)
  const truncateTitle = (title, wordLimit = 3) => {
    const words = title?.split(" ");
    return words?.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span className="p-2 hover:bg-gray-100 rounded-full">
          <span className="sr-only">Cart</span>
          <HiOutlineShoppingBag className="text-2xl text-gray-500 hover:text-gray-900" />
        </span>
      }
      className="w-[24rem] p-3"
    >
      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <DropdownItem className="flex text-center text-lg">
          <MdOutlineRemoveShoppingCart className="text-3xl pr-2" />
          Your cart is empty
        </DropdownItem>
      ) : (
        cartItems.map((item, index) => (
          <DropdownItem
            key={index}
            className="flex items-center justify-between border border-gray-200 bg-white shadow-md hover:bg-gray-50"
          >
            {/* Image */}
            <div className="w-1/4 flex justify-center">
              <img
                src={item.productId.images[0]} // Display the first image
                alt={item.productId.title}
                className="w-12 h-12 object-cover"
              />
            </div>
            {/* Name and Price */}
            <div className="w-1/2 flex flex-col text-left">
              <h3 className="font-semibold">
                {truncateTitle(item.productId.title)}
              </h3>
              <p className="text-gray-500">Kshs. {item.productId.base_price}</p>
            </div>

            {/* Delete Icon */}
            <div className="w-1/4 flex justify-center">
              <span
                onClick={() => handleRemoveItem(item.productId._id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <RiDeleteBack2Line className="text-xl" />
              </span>
            </div>
          </DropdownItem>
        ))
      )}

      <DropdownDivider className="py-1" />

      <DropdownHeader>
        <div className="flex justify-between">
          <Link to={"/cart"}>
            <Button color="gray" className="px-4">
              View Cart
            </Button>
          </Link>
          <Link to={"/product/checkout"}>
            <Button className="bg-yellow-400 px-4">Check out</Button>
          </Link>
        </div>
      </DropdownHeader>
    </Dropdown>
  );
};

const UserDropdown = ({ handleSignout, authId, currentUser }) => {
  const [profileImage, setProfileImage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const fetchClientProfile = async (authId) => {
    try {
      setLoading(true);
      const response = await fetchClientByAuthID(authId);
      setProfileImage(response.client.image);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientProfile(authId);
  }, [authId]);

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <span>
          <span className="sr-only">User menu</span>
          <Avatar
            img={
              profileImage ||
              "https://imgs.search.brave.com/gV6Xy99WsNTWpgT2KUNxopKhP45u8QMrrL2DGi5HYxg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc"
            }
            alt=""
            size="sm"
            rounded
          />
        </span>
      }
      className="w-56"
    >
      <DropdownHeader>
        {currentUser ? (
          <>
            <span className="block text-sm">
              Username:{" "}
              <span className="underline italic">
                {currentUser.user.username}
              </span>
            </span>
            <span className="block truncate text-sm font-medium">
              {currentUser.user.email}
            </span>
          </>
        ) : (
          <div className="flex justify-between">
            <Link to={"/login"}>
              <Button color="gray">Sign in</Button>
            </Link>
            <Link to={"/register"}>
              <Button color="blue">Sign Up</Button>
            </Link>
          </div>
        )}
      </DropdownHeader>
      <Link to={"/my-orders"}>
        <DropdownItem className="flex item-center px-2 py-4">
          <LuPackage className="mx-4 h-5 w-5" />
          My Orders
        </DropdownItem>
      </Link>
      <Link to={"/user-profile"}>
        <DropdownItem className="flex item-center px-2 py-4">
          <LuUser className="mx-4 h-5 w-5" />
          My Profile
        </DropdownItem>
      </Link>
      <DropdownDivider />
      <DropdownItem
        className="flex item-center px-2 py-4"
        onClick={handleSignout}
      >
        <LuLogOut className="mx-4 h-5 w-5" />
        Sign out
      </DropdownItem>
    </Dropdown>
  );
};

export default NavbarSection;
