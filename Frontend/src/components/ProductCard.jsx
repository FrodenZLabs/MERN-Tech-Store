/* eslint-disable react/prop-types */
import { FaCartPlus, FaRegHeart, FaRegEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  // Truncate title after a few words (e.g., 5 words)
  const truncateTitle = (title, wordLimit = 5) => {
    const words = title.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white shadow-lg rounded-lg flex flex-col items-center relative group"
    >
      {/* Image with hover effect */}
      <div className="relative w-full h-60">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-contain rounded-lg transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

        {/* Icons appear on hover */}
        <div className="absolute right-3 top-10 flex flex-col gap-x-2 gap-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Cart Button */}
          <button className="bg-white text-gray-600 p-3 rounded-lg hover:bg-[#ffd90c] relative">
            <FaCartPlus size={20} />
          </button>

          {/* Wishlist Button */}
          <button className="bg-white text-gray-600 p-3 rounded-lg hover:bg-[#ffd90c] relative">
            <FaRegHeart size={20} />
          </button>

          {/* Quick View Button */}
          <button className="bg-white text-gray-600 p-3 rounded-lg hover:bg-[#ffd90c] relative">
            <FaRegEye size={20} />
          </button>
        </div>
      </div>

      <Link to={`/product/${item._id}`}>
        <div className="p-4 flex items-center flex-col">
          <h3 className="mt-2 font-semibold text-md">
            {truncateTitle(item.name, 5)}
          </h3>
          <p className="text-gray-700 font-bold">
            Ksh. {Number(item.base_price).toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
