import { motion } from "framer-motion";
import AboutUs from "../components/AboutUs";
import NavbarHeader from "../components/NavbarHeader";
import AboutBanner from "../assets/about-banner.jpg";

const AboutUsPage = () => {
  return (
    <div>
      <NavbarHeader />
      {/* Hero Section (Introduction) */}
      <section
        className="relative bg-cover bg-center h-[40vh]"
        style={{
          backgroundImage: `url(${AboutBanner})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex items-end justify-center h-full pb-[8vh]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white max-w-xl"
          >
            <h1 className="text-6xl font-bold mb-4">About Us</h1>
          </motion.div>
        </div>
      </section>

      <AboutUs />
      {/* Company Achievements (Optional but Impactful) */}
      <section
        id="achievements"
        className="h-[50vh] flex items-center bg-gray-50"
      >
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl lg:text-4xl font-bold text-center mb-8"
          >
            Our Achievements
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Achievement 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-2xl font-bold text-blue-600 mb-2">10,000+</h4>
              <p className="text-gray-700">Students Served</p>
            </div>

            {/* Achievement 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-2xl font-bold text-blue-600 mb-2">5+</h4>
              <p className="text-gray-700">Years in the Industry</p>
            </div>

            {/* Achievement 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-2xl font-bold text-blue-600 mb-2">99%</h4>
              <p className="text-gray-700">Customer Satisfaction</p>
            </div>

            {/* Achievement 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-2xl font-bold text-blue-600 mb-2">$10M+</h4>
              <p className="text-gray-700">Total Financing Provided</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className="bg-blue-600 text-white h-[40vh] flex items-center"
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Learn More?
          </h2>
          <p className="text-lg lg:text-xl mb-8">
            Explore our services or get in touch with us today!
          </p>
          <a
            href="contact-us"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
