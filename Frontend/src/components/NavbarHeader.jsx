import { Link } from "react-router-dom";

const NavbarHeader = () => {
  return (
    <div className="absolute top-0 left-0 right-0 text-white z-50 p-10">
      <div className="flex items-center">
        <div className="w-1/4 flex justify-center">
          <a href="/" className="text-5xl">
            <span className="italic text-[#ffd90c]">Techies</span>{" "}
            <span>Store</span>
          </a>
        </div>
        <div className="w-1/2 flex justify-center">
          <ul className="flex gap-x-6">
            <Link to={"/"}>
              <li className="hover:cursor-pointer hover:text-[#ffd90c] font-semibold text-xl">
                Home
              </li>
            </Link>
            <Link to={"/about-us"}>
              <li className="hover:cursor-pointer hover:text-[#ffd90c] font-semibold text-xl">
                About
              </li>
            </Link>
            <Link to={"/contact-us"}>
              <li className="hover:cursor-pointer hover:text-[#ffd90c] font-semibold text-xl">
                Contact
              </li>
            </Link>
          </ul>
        </div>
        <div className="w-1/4 flex items-center gap-x-6 justify-end">
          <Link to={"/login"}>
            <button className="flex gap-x-1 text-black bg-gray-50 hover:bg-gray-300 rounded-lg px-6 py-3 uppercase font-semibold">
              Login
            </button>
          </Link>

          <Link to={"/register"}>
            <button className="flex gap-x-1 bg-amber-500 hover:bg-amber-700 rounded-lg px-6 py-3 uppercase font-semibold">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarHeader;
