import { Link, useLocation } from "react-router-dom";
import { FiHome, FiShoppingCart, FiClipboard, FiUser } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation(); // Get current URL path

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-[#02e1a2] text-white py-10 px-6 flex flex-col items-center rounded-tr-2xl">
      {/* Centered Title */}
      <h2 className="text-4xl font-bold mb-8 text-center text-[#3300ff]">
        Techies<span className="text-black italic">Store</span>
      </h2>

      <nav className="w-full">
        <ul className="w-full">
          <li className="mb-4">
            <Link
              to="/dashboard"
              className={`flex items-center uppercase font-bold gap-x-2 px-8 py-4 rounded-lg 
                ${
                  isActive("/dashboard")
                    ? "bg-black text-white"
                    : "bg-[#19fdbd] text-black hover:bg-[#02ae7e]"
                }`}
            >
              <FiHome size={24} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/products"
              className={`flex items-center uppercase font-bold gap-x-2 px-8 py-4 rounded-lg 
                ${
                  isActive("/products")
                    ? "bg-black text-white"
                    : "bg-[#19fdbd] text-black hover:bg-[#02ae7e]"
                }`}
            >
              <FiShoppingCart size={24} />
              <span>Products</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/loan-status"
              className={`flex items-center uppercase font-bold gap-x-2 px-8 py-4 rounded-lg 
                ${
                  isActive("/loan-status")
                    ? "bg-black text-white"
                    : "bg-[#19fdbd] text-black hover:bg-[#02ae7e]"
                }`}
            >
              <FiClipboard size={24} />
              <span>Loan Status</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/profile"
              className={`flex items-center uppercase font-bold gap-x-2 px-8 py-4 rounded-lg 
                ${
                  isActive("/profile")
                    ? "bg-black text-white"
                    : "bg-[#19fdbd] text-black hover:bg-[#02ae7e]"
                }`}
            >
              <FiUser size={24} />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
