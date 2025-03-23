import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#02e1a2] text-white py-2 rounded-tr-2xl">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex">
          <a href="/" className="text-4xl font-bold text-[#ff0000]">
            Tech<span className="text-black italic">Store</span>
          </a>
        </div>
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline hover:text-black">
                Home
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:underline hover:text-black">
                About
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="hover:underline hover:text-black"
              >
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-black">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex">
          <a href="#">
            <FaFacebook className="text-2xl mx-2 hover:text-black" />
          </a>
          <a href="#">
            <FaTwitter className="text-2xl mx-2 hover:text-black" />
          </a>
          <a href="#">
            <FaLinkedin className="text-2xl mx-2 hover:text-black" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
